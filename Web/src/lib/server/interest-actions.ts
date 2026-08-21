import { fail, type RequestEvent } from "@sveltejs/kit";
import { Effect } from "effect";
import { parseProductInterestFormData } from "$lib/domain/interest";
import { parseInterestSignalFormData } from "$lib/domain/interest-signal";
import {
	admittedInterestClientAddress,
	parseInterestHostnames,
	saveInterestSignal,
	saveProductInterest,
} from "$lib/server/interest-store";

const interestUnavailable = (kind: "signal" | "contact") => ({
	ok: false as const,
	kind,
	code: "unavailable" as const,
	message: "Product interest is temporarily unavailable.",
});

/** Read the public Turnstile key without exposing any private binding. */
export function turnstileSiteKey(platform: App.Platform | undefined): string | null {
	return platform?.env.TURNSTILE_SITE_KEY ?? null;
}

/** Verify and persist one aggregate-only roadmap signal. */
export async function submitInterestSignal({ platform, request }: RequestEvent) {
	const formData = await request.formData();
	const database = platform?.env.CODELOUD_INTEREST_DB;
	const turnstileSecret = platform?.env.TURNSTILE_SECRET;
	if (!database || !turnstileSecret) return fail(503, interestUnavailable("signal"));
	const turnstileValue = formData.get("cf-turnstile-response");
	const turnstileToken = turnstileValue instanceof File ? "" : (turnstileValue ?? "");
	return Effect.runPromise(
		Effect.gen(function* () {
			const input = yield* parseInterestSignalFormData(formData);
			yield* saveInterestSignal(
				database,
				input,
				{
					turnstileToken,
					clientAddress: "unavailable",
					turnstileSecret,
					allowedHostnames: parseInterestHostnames(platform.env.CODELOUD_INTEREST_HOSTNAMES),
					expectedAction: "codeloud_signal",
				},
				{ fetch, now: () => new Date() },
			);
			return { ok: true as const, kind: "signal" as const };
		}).pipe(
			Effect.catchTags({
				InterestSignalFormError: (error) =>
					Effect.succeed(
						fail(400, {
							ok: false as const,
							kind: "signal" as const,
							code: "invalid" as const,
							message: error.message,
						}),
					),
				InterestVerificationError: () => Effect.succeed(fail(503, interestUnavailable("signal"))),
				InterestPersistenceError: () => Effect.succeed(fail(503, interestUnavailable("signal"))),
			}),
		),
	);
}

/** Verify and persist one explicit early-access contact request. */
export async function submitContactInterest({ platform, request }: RequestEvent) {
	const formData = await request.formData();
	const database = platform?.env.CODELOUD_INTEREST_DB;
	const turnstileSecret = platform?.env.TURNSTILE_SECRET;
	if (!database || !turnstileSecret) return fail(503, interestUnavailable("contact"));
	const turnstileValue = formData.get("cf-turnstile-response");
	const turnstileToken = turnstileValue instanceof File ? "" : (turnstileValue ?? "");
	return Effect.runPromise(
		Effect.gen(function* () {
			const input = yield* parseProductInterestFormData(formData);
			const saved = yield* saveProductInterest(
				database,
				input,
				{
					turnstileToken,
					clientAddress: admittedInterestClientAddress(request.headers.get("cf-connecting-ip")),
					turnstileSecret,
					allowedHostnames: parseInterestHostnames(platform.env.CODELOUD_INTEREST_HOSTNAMES),
					expectedAction: "codeloud_interest",
				},
				{ fetch, now: () => new Date() },
			);
			return {
				ok: true as const,
				kind: "contact" as const,
				product: input.product,
				status: saved.status,
			};
		}).pipe(
			Effect.catchTags({
				InterestFormError: (error) =>
					Effect.succeed(
						fail(400, {
							ok: false as const,
							kind: "contact" as const,
							code: "invalid" as const,
							message: error.message,
						}),
					),
				InterestVerificationError: () => Effect.succeed(fail(503, interestUnavailable("contact"))),
				InterestPersistenceError: () => Effect.succeed(fail(503, interestUnavailable("contact"))),
			}),
		),
	);
}
