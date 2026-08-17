import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { Effect } from "effect";
import { parseProductInterestFormData } from "$lib/domain/interest";
import {
	admittedInterestClientAddress,
	parseInterestHostnames,
	saveProductInterest,
} from "$lib/server/interest-store";

export const load = (({ platform }) => {
	return {
		turnstileSiteKey: platform?.env.TURNSTILE_SITE_KEY ?? null,
	};
}) satisfies PageServerLoad;

const INTEREST_UNAVAILABLE = {
	ok: false as const,
	code: "unavailable" as const,
	message: "Product interest is temporarily unavailable.",
};

export const actions = {
	interest: async ({ platform, request }) => {
		const formData = await request.formData();
		const database = platform?.env.CODELOUD_INTEREST_DB;
		const turnstileSecret = platform?.env.TURNSTILE_SECRET;
		if (!database || !turnstileSecret) return fail(503, INTEREST_UNAVAILABLE);
		const turnstileValue = formData.get("cf-turnstile-response");
		// A File value (unexpected for this field) or an absent value becomes an
		// empty token, which the store rejects before verification.
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
					},
					{ fetch, now: () => new Date() },
				);
				return {
					ok: true as const,
					product: input.product,
					status: saved.status,
				};
			}).pipe(
				Effect.catchTags({
					InterestFormError: (error) =>
						Effect.succeed(
							fail(400, {
								ok: false as const,
								code: "invalid" as const,
								message: error.message,
							}),
						),
					InterestVerificationError: () => Effect.succeed(fail(503, INTEREST_UNAVAILABLE)),
					InterestPersistenceError: () => Effect.succeed(fail(503, INTEREST_UNAVAILABLE)),
				}),
			),
		);
	},
} satisfies Actions;
