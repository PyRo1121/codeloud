import type { ProductId } from "$lib/domain/product-catalog";

interface CapabilityLine {
	readonly title: string;
	readonly detail: string;
}

/** Editorial content for one CodeLoud product. */
export interface ProductContent {
	readonly id: ProductId;
	readonly eyebrow: string;
	readonly heading: string;
	readonly body: string;
	readonly capabilities: readonly CapabilityLine[];
	readonly technicalNote: string;
	readonly cta: string;
}

const PRODUCT_CONTENT: readonly ProductContent[] = [
	{
		id: "voice",
		eyebrow: "Voice / input plane",
		heading: "Speak naturally. Keep the terms that matter.",
		body: "Voice turns prompts, code, commands, and rough ideas into reviewable developer text without hiding what the recognizer heard.",
		capabilities: [
			{
				title: "Project vocabulary",
				detail:
					"Surface filenames, symbols, packages, paths, and commands from the project in use.",
			},
			{
				title: "Visible correction",
				detail:
					"Keep the original transcript available while proposed identifier corrections stay bounded and reviewable.",
			},
			{
				title: "Controlled delivery",
				detail: "Choose when text reaches the editor, terminal, issue tracker, or chat surface.",
			},
		],
		technicalNote:
			"Voice uses automatic speech recognition as its first step. Provider retention and training-use policies vary, so CodeLoud does not make a universal zero-retention claim.",
		cta: "Register Voice interest",
	},
	{
		id: "relay",
		eyebrow: "Relay / context plane",
		heading: "One MCP connection. Several technical workflows.",
		body: "Relay gives coding agents one focused connection for exact-version documentation, technical research, package review, repository lineage, and evidence replay.",
		capabilities: [
			{
				title: "Exact identity",
				detail:
					"Resolve the package, ecosystem, version, or project dependency before source retrieval.",
			},
			{
				title: "Sourced context",
				detail:
					"Return bounded passages with source locators, hashes, and explicit evidence status.",
			},
			{
				title: "Fail-closed research",
				detail:
					"Abstain when versions, sources, or support are ambiguous instead of silently choosing nearby context.",
			},
		],
		technicalNote:
			"Relay is an MCP server. MCP is the connection protocol; Relay is the product that consolidates the technical-context workflows behind it.",
		cta: "Apply for Relay beta",
	},
];

/** Look up editorial content for a known public product. */
export function contentForProduct(id: ProductId): ProductContent {
	const content = PRODUCT_CONTENT.find((candidate) => candidate.id === id);
	if (!content) throw new Error(`Missing product content: ${id}`);
	return content;
}
