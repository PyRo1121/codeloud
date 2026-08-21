import type { GuideDefinition } from "./guides";
import type { ProductPageDefinition } from "./product-pages";

export const SITE_ORIGIN = "https://codeloud.xyz" as const;
export const SOCIAL_IMAGE_URL = `${SITE_ORIGIN}/og-codeloud.png` as const;

type JsonPrimitive = boolean | null | number | string;
type JsonValue = JsonPrimitive | { readonly [key: string]: JsonValue } | readonly JsonValue[];

interface Breadcrumb {
	readonly name: string;
	readonly path: `/${string}` | "/";
}

/** Serialize trusted, repository-owned structured data without allowing a closing script tag. */
export function serializeStructuredData(value: JsonValue): string {
	return JSON.stringify(value).replaceAll("<", "\\u003c");
}

/** Organization entity for pages that present CodeLoud itself, with a visible breadcrumb trail. */
export function organizationPageStructuredData(): string {
	return serializeStructuredData({
		"@context": "https://schema.org",
		"@graph": [
			{ "@id": `${SITE_ORIGIN}/#organization`, ...organizationEntity() },
			breadcrumbStructuredData([
				{ name: "CodeLoud", path: "/" },
				{ name: "About", path: "/about" },
			]),
		],
	});
}

/** Describe the guides hub and its visible guide list without inventing ratings or dates. */
export function guidesHubStructuredData(guides: readonly GuideDefinition[]): string {
	return serializeStructuredData({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${SITE_ORIGIN}/guides#collection`,
				name: "CodeLoud guides",
				url: `${SITE_ORIGIN}/guides`,
				inLanguage: "en",
				publisher: { "@id": `${SITE_ORIGIN}/#organization` },
			},
			{
				"@type": "ItemList",
				itemListElement: guides.map((guide, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: guide.title,
					url: `${SITE_ORIGIN}/guides/${guide.slug}`,
				})),
			},
			breadcrumbStructuredData([
				{ name: "CodeLoud", path: "/" },
				{ name: "Guides", path: "/guides" },
			]),
		],
	});
}

function organizationEntity() {
	return {
		"@type": "Organization",
		name: "CodeLoud",
		url: `${SITE_ORIGIN}/`,
		logo: `${SITE_ORIGIN}/favicon.svg`,
		description:
			"CodeLoud builds developer tools for reliable coding-agent input and inspectable technical context.",
	} satisfies Record<string, JsonValue>;
}

/** Organization and website entities belong on the canonical homepage. */
export function homepageStructuredData(): string {
	return serializeStructuredData({
		"@context": "https://schema.org",
		"@graph": [
			{ "@id": `${SITE_ORIGIN}/#organization`, ...organizationEntity() },
			{
				"@type": "WebSite",
				"@id": `${SITE_ORIGIN}/#website`,
				name: "CodeLoud",
				url: `${SITE_ORIGIN}/`,
				publisher: { "@id": `${SITE_ORIGIN}/#organization` },
				inLanguage: "en",
			},
		],
	});
}

/** Describe a product without inventing pricing, ratings, availability, or platform support. */
export function productStructuredData(page: ProductPageDefinition): string {
	const url = `${SITE_ORIGIN}/${page.id}`;
	return serializeStructuredData({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "SoftwareApplication",
				"@id": `${url}#software`,
				name: `CodeLoud ${page.id === "voice" ? "Voice" : "Relay"}`,
				url,
				description: page.description,
				applicationCategory: "DeveloperApplication",
				publisher: { "@id": `${SITE_ORIGIN}/#organization` },
			},
			breadcrumbStructuredData([
				{ name: "CodeLoud", path: "/" },
				{ name: page.id === "voice" ? "Voice" : "Relay", path: `/${page.id}` },
			]),
		],
	});
}

/** Describe an original technical guide and its visible breadcrumb trail. */
export function guideStructuredData(guide: GuideDefinition): string {
	const url = `${SITE_ORIGIN}/guides/${guide.slug}`;
	return serializeStructuredData({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "TechArticle",
				"@id": `${url}#article`,
				headline: guide.title,
				description: guide.description,
				url,
				mainEntityOfPage: url,
				inLanguage: "en",
				author: { "@id": `${SITE_ORIGIN}/#organization` },
				publisher: { "@id": `${SITE_ORIGIN}/#organization` },
				about: guide.topics,
			},
			breadcrumbStructuredData([
				{ name: "CodeLoud", path: "/" },
				{ name: "Guides", path: "/guides" },
				{ name: guide.shortTitle, path: `/guides/${guide.slug}` },
			]),
		],
	});
}

function breadcrumbStructuredData(items: readonly Breadcrumb[]) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${SITE_ORIGIN}${item.path}`,
		})),
	};
}
