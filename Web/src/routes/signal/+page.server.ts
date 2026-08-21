import type { Actions, PageServerLoad } from "./$types";
import { submitInterestSignal, turnstileSiteKey } from "$lib/server/interest-actions";

/** Supply only the public Turnstile site key to the form route. */
export const load = (({ platform }) => ({
	turnstileSiteKey: turnstileSiteKey(platform),
})) satisfies PageServerLoad;

export const actions = {
	signal: submitInterestSignal,
} satisfies Actions;
