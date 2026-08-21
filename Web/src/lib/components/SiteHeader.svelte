<script lang="ts">
	import { resolve } from "$app/paths";

	type ActivePage = "home" | "voice" | "relay" | "guides" | "privacy" | "early-access" | "signal";

	interface Props {
		readonly active?: ActivePage;
	}

	let { active = "home" }: Props = $props();
</script>

<header class="site-header page-shell">
	<a class="wordmark" href={resolve("/")} aria-label="CodeLoud home">
		<span class="wordmark-glyph" aria-hidden="true"><i></i><i></i><i></i></span>
		<span>CODE<em>/</em>LOUD</span>
	</a>
	<nav aria-label="Primary navigation">
		<a class={active === "voice" ? "active" : ""} href={resolve("/voice")}>Voice</a>
		<a class={active === "relay" ? "active" : ""} href={resolve("/relay")}>Relay</a>
		<a class={active === "guides" ? "active" : ""} href={resolve("/guides")}>Guides</a>
	</nav>
	<a
		class={`signal-link ${active === "early-access" ? "active" : ""}`}
		href={resolve("/early-access")}>Request early access <span aria-hidden="true">↗</span></a
	>
</header>

<style>
	.site-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		min-height: 4.5rem;
		border-bottom: 1px solid var(--line);
	}

	.wordmark {
		display: inline-flex;
		gap: 0.7rem;
		align-items: center;
		width: fit-content;
		color: var(--text);
		font-size: 0.92rem;
		font-weight: 780;
		letter-spacing: -0.035em;
		text-decoration: none;
	}

	.wordmark em {
		color: var(--accent);
		font-style: normal;
	}

	.wordmark-glyph {
		display: grid;
		gap: 2px;
		width: 1rem;
	}

	.wordmark-glyph i {
		display: block;
		height: 2px;
		background: currentColor;
	}

	.wordmark-glyph i:nth-child(2) {
		width: 70%;
		margin-left: 30%;
	}

	.wordmark-glyph i:nth-child(3) {
		width: 42%;
	}

	nav {
		display: flex;
		gap: 1.8rem;
	}

	nav a,
	.signal-link {
		position: relative;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.68rem;
		text-decoration: none;
		transition: color 160ms ease;
	}

	nav a::after {
		position: absolute;
		right: 0;
		bottom: -0.45rem;
		left: 0;
		height: 1px;
		background: var(--accent);
		content: "";
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 160ms ease;
	}

	nav a:hover,
	nav a.active,
	.signal-link:hover {
		color: var(--text);
	}

	nav a.active::after,
	nav a:hover::after {
		transform: scaleX(1);
	}

	.signal-link {
		justify-self: end;
		border: 1px solid var(--line-strong);
		border-radius: 0.55rem;
		padding: 0.55rem 0.7rem;
		color: var(--text);
		transition:
			border-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
			background 180ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.signal-link:hover,
	.signal-link.active {
		border-color: var(--accent);
		background: var(--accent-soft);
	}

	.signal-link:active {
		transform: translateY(1px);
	}

	.signal-link span {
		margin-left: 0.35rem;
		color: var(--accent);
	}

	@media (max-width: 720px) {
		.site-header {
			grid-template-columns: 1fr auto;
		}

		nav {
			display: none;
		}
	}
</style>
