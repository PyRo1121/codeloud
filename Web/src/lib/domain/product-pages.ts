import type { ProductId } from "./product-catalog";

/** One factual capability explained on a dedicated product page. */
export interface ProductPageCapability {
	readonly title: string;
	readonly detail: string;
}

/** Search-focused, visible content for one CodeLoud product page. */
export interface ProductPageDefinition {
	readonly id: ProductId;
	readonly eyebrow: string;
	readonly title: string;
	readonly description: string;
	readonly promise: string;
	readonly problemTitle: string;
	readonly problem: string;
	readonly workflowTitle: string;
	readonly workflow: readonly string[];
	readonly capabilitiesTitle: string;
	readonly capabilities: readonly ProductPageCapability[];
	readonly boundaryTitle: string;
	readonly boundary: string;
	readonly ctaLabel: string;
	readonly cta:
		| { readonly _tag: "internal"; readonly url: "/early-access?product=voice" }
		| { readonly _tag: "external"; readonly url: `https://${string}` };
}

const PRODUCT_PAGES = {
	voice: {
		id: "voice",
		eyebrow: "CodeLoud Voice / developer dictation",
		title: "Voice dictation for coding agents that keeps code terms reviewable.",
		description:
			"Dictate coding-agent prompts, commands, and code-adjacent notes. Review project terms, filenames, symbols, paths, packages, and commands before insertion.",
		promise:
			"Speak prompts, commands, code-adjacent notes, and rough ideas without pretending uncertain recognition is certain.",
		problemTitle: "Speech recognition breaks at code-specific terms.",
		problem:
			"General speech recognition is optimized for ordinary language. Developer work is full of uncommon identifiers, compact commands, version strings, and repository-specific vocabulary where one character can change the meaning.",
		workflowTitle: "From spoken prompt to reviewed developer text.",
		workflow: [
			"Capture speech for a prompt, command, issue, note, or code-adjacent task.",
			"Compare recognized language with bounded project vocabulary such as symbols and paths.",
			"Review the original transcript and proposed corrections before insertion.",
		],
		capabilitiesTitle: "Code-aware dictation without silent rewrites.",
		capabilities: [
			{
				title: "Project-aware vocabulary",
				detail:
					"Surface relevant filenames, symbols, packages, paths, and commands from the approved project context.",
			},
			{
				title: "Visible correction",
				detail:
					"Keep recognition uncertainty and proposed identifier changes reviewable instead of silently rewriting text.",
			},
			{
				title: "Controlled insertion",
				detail:
					"Choose when reviewed text reaches an editor, terminal, issue tracker, or coding-agent prompt.",
			},
		],
		boundaryTitle: "Provider boundaries stay visible",
		boundary:
			"Voice currently uses external speech providers. Retention, deletion, and training-use policies vary by provider, so CodeLoud does not claim universal local processing or zero retention.",
		ctaLabel: "Request Voice early access",
		cta: { _tag: "internal", url: "/early-access?product=voice" },
	},
	relay: {
		id: "relay",
		eyebrow: "CodeLoud Relay / MCP technical context",
		title: "Exact-version documentation and sourced context through one MCP server.",
		description:
			"CodeLoud Relay is an MCP documentation server for exact-version docs, sourced technical research, package review, and replayable coding-agent evidence.",
		promise:
			"Resolve what the project actually uses before retrieving context, and abstain when the available evidence cannot support a precise answer.",
		problemTitle: "Plausible context can still be the wrong version.",
		problem:
			"Coding agents can receive plausible documentation for the wrong version, unbounded web results, or package advice without durable evidence. Relay puts identity, source admission, and evidence status ahead of answer generation.",
		workflowTitle: "Resolve identity before retrieving documentation.",
		workflow: [
			"Resolve the package, ecosystem, version, repository, or project dependency first.",
			"Retrieve bounded documentation or admitted technical sources for that identity.",
			"Return source locators, evidence excerpts, hashes, and explicit support status to the agent.",
		],
		capabilitiesTitle: "MCP context with inspectable evidence attached.",
		capabilities: [
			{
				title: "Exact-version docs",
				detail:
					"Ground package documentation in the resolved ecosystem and version rather than a nearby latest release.",
			},
			{
				title: "Package review",
				detail:
					"Provide advisory dependency signals, provenance evidence, and bounded trust findings before installation.",
			},
			{
				title: "Sourced research",
				detail:
					"Return admitted passages and replayable evidence instead of presenting unsupported synthesis as verification.",
			},
		],
		boundaryTitle: "Context evidence is not final-answer verification",
		boundary:
			"Relay grounds the context available to a coding agent. The agent still owns its interpretation, code changes, and final answer. Relay abstains when versions or sources remain ambiguous.",
		ctaLabel: "Apply for the Relay beta",
		cta: { _tag: "external", url: "https://relay.codeloud.xyz/#beta" },
	},
} satisfies Readonly<Record<ProductId, ProductPageDefinition>>;

/** Resolve dedicated product-page content; a missing entry is a development defect. */
export function productPageFor(id: ProductId): ProductPageDefinition {
	return PRODUCT_PAGES[id];
}
