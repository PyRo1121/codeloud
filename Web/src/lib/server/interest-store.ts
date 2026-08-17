import { Schema } from "effect";
import { Effect } from "effect";
import type { ProductInterestInput } from "$lib/domain/interest";

/** Result of persisting one product-interest submission. */
export type ProductInterestStoreResult = {
	readonly status: "created" | "duplicate";
};

/** Small database seam used by the interest writer and its focused tests. */
export interface ProductInterestDatabase {
	prepare(query: string): ProductInterestStatement;
}

interface ProductInterestStatement {
	bind(...values: ReadonlyArray<string | number | null>): ProductInterestStatement;
	run(): Promise<{ readonly meta: { readonly changes: number } }>;
}

/** Dependencies used by the interest store's external verification boundary. */
export interface InterestStoreDependencies {
	readonly fetch: typeof fetch;
	readonly now: () => Date;
}

/** Data supplied by the form action but never persisted as product-interest content. */
export interface InterestSubmissionSecurity {
	readonly turnstileToken: string;
	readonly clientAddress: string;
	readonly turnstileSecret: string;
	readonly allowedHostnames: readonly string[];
}

/** Expected Turnstile rejection or configuration failure. */
export class InterestVerificationError extends Schema.TaggedError<InterestVerificationError>()(
	"InterestVerificationError",
	{ message: Schema.String },
) {}

/** Expected persistence failure classified without leaking store details. */
export class InterestPersistenceError extends Schema.TaggedError<InterestPersistenceError>()(
	"InterestPersistenceError",
	{ message: Schema.String },
) {}

const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "codeloud_interest";
const MAX_TURNSTILE_TOKEN_LENGTH = 2_048;
const TURNSTILE_TIMEOUT_MS = 10_000;
const HOSTNAME_PATTERN =
	/^([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/u;

const turnstileResponseSchema = Schema.Struct({
	success: Schema.Boolean,
	action: Schema.optionalWith(Schema.String, { exact: true }),
	hostname: Schema.optionalWith(Schema.String, { exact: true }),
});

/** The declared siteverify response shape this module consumes. */
type TurnstileSiteVerifyResponse = (typeof turnstileResponseSchema)["Encoded"];

function privateSourceValue(value: boolean | undefined): number | null {
	if (value === undefined) return null;
	return value ? 1 : 0;
}

/** Parse the configured public hostnames before they become verification authority. */
export function parseInterestHostnames(value: string | undefined): readonly string[] {
	if (!value) return [];
	const hostnames: string[] = [];
	for (const candidate of value.split(",")) {
		const hostname = candidate.trim().toLowerCase();
		if (!hostname || hostname.length > 253 || !HOSTNAME_PATTERN.test(hostname)) return [];
		hostnames.push(hostname);
	}
	return [...new Set(hostnames)];
}

/** Bound a client address for the optional Turnstile signal without persisting it. */
export function admittedInterestClientAddress(value: string | null): string {
	if (!value || value.length > 64 || /[^0-9a-f:.]/iu.test(value)) return "unavailable";
	return value.toLowerCase();
}

/** Persist product interest only after server-side Turnstile verification. */
export const saveProductInterest = (
	database: ProductInterestDatabase,
	input: ProductInterestInput,
	security: InterestSubmissionSecurity,
	dependencies: InterestStoreDependencies,
): Effect.Effect<
	ProductInterestStoreResult,
	InterestVerificationError | InterestPersistenceError,
	never
> =>
	Effect.gen(function* () {
		const verified = yield* verifyInterestTurnstile(security, dependencies.fetch);
		if (!verified)
			return yield* Effect.fail(
				new InterestVerificationError({
					message: "Product interest could not be verified.",
				}),
			);
		try {
			const result = yield* Effect.tryPromise({
				try: () =>
					database
						.prepare(
							`INSERT OR IGNORE INTO codeloud_product_interest
							(email_normalized, product_selection, applicant_name, workflow,
							 operating_system, editor_name, coding_client, private_source_needed,
							 created_at)
							VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
						)
						.bind(
							input.email,
							input.product,
							input.name ?? null,
							input.workflow,
							input.operatingSystem ?? null,
							input.editor ?? null,
							input.codingClient ?? null,
							privateSourceValue(input.privateSourceNeeded),
							dependencies.now().toISOString(),
						)
						.run(),
				catch: (cause) => {
					console.error("product interest: database write failed", cause);
					return new InterestPersistenceError({
						message: "Product interest could not be stored.",
					});
				},
			});
			return {
				status: result.meta.changes > 0 ? "created" : "duplicate",
			};
		} finally {
			// Nothing to release; kept explicit so future handles are not added
			// without an owner.
		}
	});

const verifyInterestTurnstile = (
	security: InterestSubmissionSecurity,
	fetchImplementation: typeof fetch,
): Effect.Effect<boolean, InterestVerificationError, never> => {
	if (
		security.turnstileSecret.trim().length === 0 ||
		security.allowedHostnames.length === 0 ||
		security.turnstileToken.length === 0 ||
		security.turnstileToken.length > MAX_TURNSTILE_TOKEN_LENGTH
	)
		return Effect.succeed(false);
	return Effect.gen(function* () {
		const form = new URLSearchParams({
			secret: security.turnstileSecret,
			response: security.turnstileToken,
		});
		if (security.clientAddress !== "unavailable") form.set("remoteip", security.clientAddress);
		const response = yield* Effect.tryPromise({
			try: () =>
				fetchImplementation(TURNSTILE_SITEVERIFY_URL, {
					method: "POST",
					headers: { "content-type": "application/x-www-form-urlencoded" },
					body: form,
					signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
				}),
			catch: (cause) => {
				console.error("product interest: Turnstile siteverify request failed", cause);
				return new InterestVerificationError({
					message: "Product interest verification is unavailable.",
				});
			},
		});
		if (!response.ok) {
			console.error(`product interest: Turnstile siteverify returned status ${response.status}`);
			return false;
		}
		const body = yield* Effect.tryPromise({
			try: (): Promise<TurnstileSiteVerifyResponse> => response.json(),
			catch: (cause) => {
				console.error("product interest: Turnstile siteverify body was not JSON", cause);
				return new InterestVerificationError({
					message: "Product interest verification is unavailable.",
				});
			},
		});
		const parsed = yield* Effect.mapError(
			Schema.decodeUnknown(turnstileResponseSchema)(body),
			() =>
				new InterestVerificationError({
					message: "Product interest verification is unavailable.",
				}),
		);
		const accepted =
			parsed.success &&
			parsed.action === TURNSTILE_ACTION &&
			parsed.hostname !== undefined &&
			security.allowedHostnames.includes(parsed.hostname.toLowerCase());
		if (!accepted) console.error("product interest: Turnstile token rejected", parsed);
		return accepted;
	});
};
