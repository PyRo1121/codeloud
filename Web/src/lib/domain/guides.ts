export const GUIDE_SLUGS = [
	"voice-coding-agents",
	"coding-agent-context",
	"mcp-documentation-servers",
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export interface GuideSection {
	readonly id: string;
	readonly title: string;
	readonly paragraphs: readonly string[];
	readonly points?: readonly string[];
	readonly sourceIds?: readonly string[];
}

export interface GuideSource {
	readonly id: string;
	readonly publisher: string;
	readonly title: string;
	readonly url: `https://${string}`;
}

export interface GuideDefinition {
	readonly slug: GuideSlug;
	readonly shortTitle: string;
	readonly seoTitle: string;
	readonly title: string;
	readonly description: string;
	readonly summary: string;
	readonly topics: readonly string[];
	readonly sections: readonly GuideSection[];
	readonly sources: readonly GuideSource[];
	readonly product: "voice" | "relay";
	readonly related: readonly GuideSlug[];
}

const GUIDES = {
	"voice-coding-agents": {
		slug: "voice-coding-agents",
		shortTitle: "Voice coding agents",
		seoTitle: "Voice Coding Agents and Code-Aware Dictation | CodeLoud",
		title: "Voice coding agents: dictate prompts without losing the code terms",
		description:
			"Learn how voice input for coding agents works, why developer vocabulary breaks general dictation, and what to review before a spoken prompt is sent.",
		summary:
			"Voice coding works best as a reviewed input layer: speak the intent, resolve code-specific terms, inspect the transcript, then send it to the agent.",
		topics: [
			"voice coding agents",
			"developer dictation",
			"coding-agent prompts",
			"code-aware speech recognition",
		],
		sections: [
			{
				id: "what-voice-coding-means",
				title: "Voice coding usually means speaking intent, not source code",
				paragraphs: [
					"For modern coding agents, voice coding usually means dictating the task you want an agent to perform: explain a bug, describe a refactor, name constraints, or define what done looks like. It is different from trying to pronounce every brace, operator, and punctuation mark in a source file.",
					"That distinction matters because coding agents respond to goals and context. OpenAI's Codex guidance recommends giving an agent a goal, relevant context, constraints, and completion criteria. Speech can make that explanation faster when the developer can still inspect the text before submission.",
				],
				points: [
					"Speak the desired outcome and why it matters.",
					"Name relevant files, symbols, packages, or errors.",
					"State constraints and the checks that define completion.",
				],
				sourceIds: ["codex-best-practices"],
			},
			{
				id: "why-dictation-fails",
				title: "Developer vocabulary is where ordinary dictation fails",
				paragraphs: [
					"General speech recognition is optimized for ordinary language. Repositories contain uncommon identifiers, compact commands, package names, paths, acronyms, and version strings. A transcript can sound fluent while changing the one token that determines what the agent edits.",
					"Current coding tools already acknowledge this problem. Claude Code documents coding-vocabulary tuning and uses the current project and Git branch as recognition hints. It also leaves the transcript editable before submission in its default hold-to-record flow. Those choices point to the useful pattern: domain hints plus human review, not blind auto-send.",
				],
				points: [
					"Check identifiers that differ only by case or punctuation.",
					"Check paths, shell commands, package names, and version numbers.",
					"Keep the original transcript visible when a tool proposes corrections.",
				],
				sourceIds: ["claude-voice"],
			},
			{
				id: "reviewed-workflow",
				title: "Use a four-step reviewed workflow",
				paragraphs: [
					"A reliable voice workflow separates capture from submission. First capture the speech. Then compare uncertain words with bounded project vocabulary. Next let the developer review the exact text. Only after approval should the instruction reach the editor, terminal, issue tracker, or coding agent.",
					"Project awareness should narrow ambiguity rather than silently rewrite meaning. If both a class and a package have similar spoken names, the interface should show the alternatives or preserve the uncertain transcript instead of pretending certainty.",
				],
				points: [
					"Capture: preserve the spoken instruction as text.",
					"Resolve: compare uncertain terms with approved project context.",
					"Review: show proposed code-aware corrections.",
					"Send: insert only the text the developer approved.",
				],
			},
			{
				id: "privacy-and-fit",
				title: "Evaluate privacy, platform fit, and failure behavior",
				paragraphs: [
					"Voice input can cross a provider boundary. Before adopting a tool, check where audio is processed, whether remote sessions work, how long audio or transcripts are retained, and whether the tool can operate in the editor or agent you already use. Avoid assuming that every voice feature is local or available under every authentication mode.",
					"The best fit is not the system with the most aggressive automation. It is the one that makes uncertain recognition visible, supports the environments you actually use, and gives you control over when reviewed text leaves the input layer.",
				],
				sourceIds: ["claude-voice"],
			},
		],
		sources: [
			{
				id: "claude-voice",
				publisher: "Anthropic",
				title: "Claude Code voice dictation",
				url: "https://code.claude.com/docs/en/voice-dictation",
			},
			{
				id: "codex-best-practices",
				publisher: "OpenAI",
				title: "Codex best practices",
				url: "https://developers.openai.com/codex/learn/best-practices",
			},
		],
		product: "voice",
		related: ["coding-agent-context"],
	},
	"coding-agent-context": {
		slug: "coding-agent-context",
		shortTitle: "Coding-agent context",
		seoTitle: "Coding Agent Context Engineering | CodeLoud",
		title: "Coding-agent context engineering: give the model less, but make it better",
		description:
			"A practical guide to coding-agent context engineering: task scope, exact-version documentation, just-in-time retrieval, evidence, and failure handling.",
		summary:
			"Reliable coding-agent context is not the largest possible prompt. It is the smallest current, task-relevant, sourceable set of information that supports the work.",
		topics: [
			"coding-agent context engineering",
			"coding-agent reliability",
			"exact-version documentation",
			"just-in-time context",
		],
		sections: [
			{
				id: "context-not-prompt",
				title: "Context engineering is broader than prompt writing",
				paragraphs: [
					"A prompt is one part of the state available to an agent. The complete context can also include repository instructions, selected files, tool results, documentation, MCP resources, message history, and the output of previous commands.",
					"Anthropic describes context engineering as curating and maintaining the information used during inference. The practical goal is not to fill the context window. It is to select the smallest high-signal set of tokens that improves the likelihood of the desired behavior.",
				],
				sourceIds: ["anthropic-context"],
			},
			{
				id: "task-contract",
				title: "Start with a clear task contract",
				paragraphs: [
					"Before retrieving more material, make the task concrete. State the goal, identify the repository area that matters, name constraints, and define what must be true before the work is complete. This reduces assumptions and gives the agent a basis for deciding which additional context is relevant.",
					"Durable repository instructions should remain concise and practical. Task-specific details belong near the task, while external systems and changing information are better retrieved when needed.",
				],
				points: [
					"Goal: the behavior or artifact to change.",
					"Context: the files, errors, examples, and documentation that matter.",
					"Constraints: architecture, safety, compatibility, and scope boundaries.",
					"Done when: tests, checks, and observable outcomes.",
				],
				sourceIds: ["codex-best-practices"],
			},
			{
				id: "exact-version",
				title: "Resolve identity before retrieving documentation",
				paragraphs: [
					"Documentation is only useful when it describes the software actually in use. A correct answer for the latest release can be wrong for a repository pinned to an older major version, a prerelease, a fork, or a vendor-specific distribution.",
					"Version-aware retrieval should resolve the ecosystem, package identity, installed or declared version, and relevant source before selecting passages. If identity remains ambiguous, the context layer should say so rather than blending nearby versions into one confident answer.",
				],
				points: [
					"Read lockfiles, manifests, imports, and tool output before assuming latest.",
					"Keep source location and version identity attached to retrieved passages.",
					"Reject or label evidence that cannot be tied to the resolved dependency.",
				],
			},
			{
				id: "just-in-time",
				title: "Retrieve context just in time",
				paragraphs: [
					"Large static context files can bury the information that matters. A just-in-time strategy keeps lightweight references such as file paths, package identities, and source URLs, then loads bounded material when the agent reaches the question that needs it.",
					"This improves inspectability as well as token efficiency. The developer can see which source was selected, which passage was returned, and whether the available evidence actually supports the agent's claim.",
				],
				sourceIds: ["anthropic-context"],
			},
			{
				id: "evidence-contract",
				title: "Return evidence, not an unlabeled blob",
				paragraphs: [
					"Useful context has a contract: resolved identity, bounded content, source locator, freshness or version information, and an explicit support status. Those fields let an agent cite what it used and let a reviewer replay the reasoning path.",
					"Context does not verify the final code change. The agent still interprets the evidence and owns its implementation. A reliable context layer makes that boundary visible and fails closed when sources or versions cannot support a precise answer.",
				],
			},
		],
		sources: [
			{
				id: "anthropic-context",
				publisher: "Anthropic",
				title: "Effective context engineering for AI agents",
				url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
			},
			{
				id: "codex-best-practices",
				publisher: "OpenAI",
				title: "Codex best practices",
				url: "https://developers.openai.com/codex/learn/best-practices",
			},
		],
		product: "relay",
		related: ["mcp-documentation-servers", "voice-coding-agents"],
	},
	"mcp-documentation-servers": {
		slug: "mcp-documentation-servers",
		shortTitle: "MCP documentation servers",
		seoTitle: "MCP Documentation Servers for Coding Agents | CodeLoud",
		title: "MCP documentation servers: what coding agents need from them",
		description:
			"Understand how MCP documentation servers provide context, when to use resources or tools, and how to evaluate version resolution, sources, and security.",
		summary:
			"An MCP documentation server is valuable when it resolves the software in use, returns bounded sourceable material, and makes uncertainty explicit.",
		topics: [
			"MCP documentation server",
			"Model Context Protocol",
			"coding-agent documentation",
			"exact-version docs",
		],
		sections: [
			{
				id: "what-it-is",
				title: "An MCP server supplies context to an AI application",
				paragraphs: [
					"Model Context Protocol uses a client-server architecture. An AI application acts as the MCP host, creates a client connection, and obtains context or actions from an MCP server. The server can run locally over standard input and output or remotely over Streamable HTTP.",
					"The protocol defines three core server primitives: tools for executable operations, resources for contextual data, and prompts for reusable interaction templates. A documentation service can use one or more of these primitives depending on whether the client needs to browse known material or ask the server to resolve and retrieve it.",
				],
				sourceIds: ["mcp-architecture"],
			},
			{
				id: "resources-or-tools",
				title: "Resources expose data; tools perform retrieval work",
				paragraphs: [
					"MCP resources are URI-identified context that a host can list and read. They fit documentation catalogs, schemas, files, and other material whose identity is already known. Resource annotations can also communicate audience, priority, and last-modified time.",
					"A tool is a better fit when the server must do work first: inspect a package identity, resolve a version constraint, search admitted sources, or return the most relevant bounded passages. A capable documentation server may expose resources for direct browsing and tools for version-aware retrieval.",
				],
				sourceIds: ["mcp-architecture", "mcp-resources"],
			},
			{
				id: "evaluation",
				title: "Evaluate the evidence contract, not the size of the catalog",
				paragraphs: [
					"A large documentation index is not automatically useful. For coding work, the critical question is whether the server can connect returned material to the dependency, version, repository, or source that the project actually uses.",
					"Inspect the output shape. A response should preserve source locations and enough identity information for a developer to understand why a passage was selected. If the server synthesizes an answer, it should distinguish retrieved evidence from model interpretation.",
				],
				points: [
					"Identity: ecosystem, package, version, repository, or project dependency.",
					"Bounds: passages small enough to inspect and fit the task.",
					"Provenance: source URI, location, and relevant version or revision.",
					"Failure behavior: explicit ambiguity, abstention, or unsupported status.",
				],
			},
			{
				id: "security",
				title: "Treat remote context as an untrusted boundary",
				paragraphs: [
					"MCP connectivity does not make external content trustworthy. Servers should validate resource URIs, enforce access controls for sensitive material, and respect the authorization model of the underlying sources. Clients should avoid exposing private repository details to unrelated services without a clear need and policy.",
					"For remote servers, review authentication, tenant isolation, logging, retention, and which project identifiers are transmitted. For local servers, review filesystem scope, subprocess permissions, and update provenance. The right transport depends on the workflow; neither local nor remote is automatically safe.",
				],
				sourceIds: ["mcp-resources", "mcp-architecture"],
			},
			{
				id: "fit",
				title: "Use MCP when the context changes or lives outside the repository",
				paragraphs: [
					"MCP is useful when documentation, issue trackers, package intelligence, or internal sources change independently of the codebase. It gives multiple agent clients a repeatable connection instead of requiring developers to paste the same external material into each prompt.",
					"Do not add an MCP server merely to increase tool count. Start with a context source that removes a real manual loop, define the expected evidence, and test whether the agent chooses and uses the server correctly on representative tasks.",
				],
				sourceIds: ["codex-best-practices"],
			},
		],
		sources: [
			{
				id: "mcp-architecture",
				publisher: "Model Context Protocol",
				title: "Architecture overview",
				url: "https://modelcontextprotocol.io/docs/learn/architecture",
			},
			{
				id: "mcp-resources",
				publisher: "Model Context Protocol",
				title: "Resources specification",
				url: "https://modelcontextprotocol.io/specification/2025-06-18/server/resources",
			},
			{
				id: "codex-best-practices",
				publisher: "OpenAI",
				title: "Codex best practices",
				url: "https://developers.openai.com/codex/learn/best-practices",
			},
		],
		product: "relay",
		related: ["coding-agent-context"],
	},
} satisfies Readonly<Record<GuideSlug, GuideDefinition>>;

export const GUIDE_LIST: readonly GuideDefinition[] = GUIDE_SLUGS.map((slug) => GUIDES[slug]);

/** Resolve a guide from an untrusted route parameter. */
export function guideFor(slug: string): GuideDefinition | undefined {
	const knownSlug = GUIDE_SLUGS.find((candidate) => candidate === slug);
	return knownSlug ? GUIDES[knownSlug] : undefined;
}
