/**
 * Public CodeLoud product catalog owned by the family Web application.
 *
 * These are copy-level claims used to render the family site. Runtime
 * capability discovery remains owned by each product.
 */

/** The public CodeLoud products. */
export type ProductId = "voice" | "relay";

/** Product metadata rendered by the family site. */
export interface ProductDefinition {
	readonly id: ProductId;
	readonly name: string;
	readonly status: string;
	readonly descriptor: string;
	readonly promise: string;
	readonly accent: "voice" | "relay";
	/** The canonical application URL when the product accepts applications. */
	readonly applyUrl?: string;
}

/** The public product definitions rendered by the family site. */
export const PRODUCTS: readonly ProductDefinition[] = [
	{
		id: "voice",
		name: "CodeLoud Voice",
		status: "Private development",
		descriptor: "Developer dictation that keeps the terms that matter.",
		promise: "Speech-to-text for prompts, code, commands, and notes with review before insertion.",
		accent: "voice",
	},
	{
		id: "relay",
		name: "CodeLoud Relay",
		status: "Private beta",
		descriptor: "One MCP connection for technical context.",
		promise:
			"Exact-version documentation, technical research, package review, and evidence in one focused connection.",
		accent: "relay",
		applyUrl: "https://relay.codeloud.xyz/#beta",
	},
];

/** Resolve one product definition; a missing definition is a development defect. */
export function productFor(id: ProductId): ProductDefinition {
	const product = PRODUCTS.find((candidate) => candidate.id === id);
	if (!product) throw new Error(`Unknown CodeLoud product: ${id}`);
	return product;
}
