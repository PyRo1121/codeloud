import type { Actions, PageServerLoad } from "./$types";
import { INTEREST_SELECTIONS, type InterestSelection } from "$lib/domain/products";
import { submitContactInterest, turnstileSiteKey } from "$lib/server/interest-actions";

/** Admit only known product selections from the query string. */
function requestedProduct(value: string | null): InterestSelection {
	return INTEREST_SELECTIONS.find((selection) => selection === value) ?? "both";
}

export const load = (({ platform, url }) => ({
	turnstileSiteKey: turnstileSiteKey(platform),
	initialProduct: requestedProduct(url.searchParams.get("product")),
})) satisfies PageServerLoad;

export const actions = {
	interest: submitContactInterest,
} satisfies Actions;
