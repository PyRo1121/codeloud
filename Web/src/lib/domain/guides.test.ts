import { describe, expect, it } from "vitest";
import { GUIDE_LIST, GUIDE_SLUGS, guideFor } from "./guides";
import { guideStructuredData, productStructuredData } from "./seo";
import { productPageFor } from "./product-pages";

describe("guide catalog", () => {
	it("keeps route slugs, titles, and canonical content unique", () => {
		expect(GUIDE_LIST).toHaveLength(GUIDE_SLUGS.length);
		expect(new Set(GUIDE_LIST.map((guide) => guide.slug)).size).toBe(GUIDE_LIST.length);
		expect(new Set(GUIDE_LIST.map((guide) => guide.seoTitle)).size).toBe(GUIDE_LIST.length);
	});

	it("resolves every source citation and related guide", () => {
		for (const guide of GUIDE_LIST) {
			const sourceIds = new Set(guide.sources.map((source) => source.id));
			for (const section of guide.sections) {
				for (const sourceId of section.sourceIds ?? []) expect(sourceIds.has(sourceId)).toBe(true);
			}
			for (const relatedSlug of guide.related) {
				expect(relatedSlug).not.toBe(guide.slug);
				expect(guideFor(relatedSlug)).toBeDefined();
			}
		}
	});

	it("produces parseable TechArticle and product JSON-LD", () => {
		for (const guide of GUIDE_LIST) {
			const jsonLd = guideStructuredData(guide);
			expect(() => {
				JSON.parse(jsonLd);
			}).not.toThrow();
			expect(jsonLd).toContain('"@type":"TechArticle"');
		}
		for (const product of [productPageFor("voice"), productPageFor("relay")]) {
			const jsonLd = productStructuredData(product);
			expect(() => {
				JSON.parse(jsonLd);
			}).not.toThrow();
			expect(jsonLd).toContain('"@type":"SoftwareApplication"');
		}
	});
});
