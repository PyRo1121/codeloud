import { error } from "@sveltejs/kit";
import { GUIDE_SLUGS, guideFor } from "$lib/domain/guides";
import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = true;

export const entries = (() => GUIDE_SLUGS.map((slug) => ({ slug }))) satisfies EntryGenerator;

export const load = (({ params }) => {
	const guide = guideFor(params.slug);
	if (!guide) error(404, "Guide not found");
	return { guide, turnstileSiteKey: null };
}) satisfies PageLoad;
