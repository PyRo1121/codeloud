<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<footer class="site-footer page-shell">
	<a class="footer-mark" href={resolve("/")}>CODE<span>/</span>LOUD</a>
	<p>Spend less time correcting and fact-checking your coding agent.</p>
	<nav aria-label="Footer navigation">
		<a href={resolve("/voice")}>Voice</a>
		<a href={resolve("/relay")}>Relay</a>
		<a href={resolve("/guides")}>Guides</a>
		<a href={resolve("/about")}>About</a>
		<a href={resolve("/early-access")}>Early access</a>
		<a href={resolve("/signal")}>Shape the roadmap</a>
		<a href={resolve("/privacy")}>Privacy</a>
		<a href="https://relay.codeloud.xyz/account" rel="external noopener">Console ↗</a>
	</nav>
</footer>

<style>
	.site-footer {
		display: grid;
		grid-template-columns: auto minmax(14rem, 1fr) auto;
		gap: clamp(2rem, 6vw, 7rem);
		align-items: start;
		border-top: 1px solid var(--line-strong);
		padding-block: 2.5rem 3.5rem;
	}

	.footer-mark {
		font-size: 0.9rem;
		font-weight: 780;
		letter-spacing: -0.035em;
		text-decoration: none;
	}

	.footer-mark span {
		color: var(--accent);
	}

	p {
		max-width: 42ch;
		margin: 0;
		color: var(--muted);
		font-size: 0.78rem;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem 1.4rem;
		justify-content: flex-end;
	}

	nav a {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.66rem;
		text-decoration: none;
	}

	nav a:hover {
		color: var(--text);
	}

	@media (max-width: 760px) {
		.site-footer {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		nav {
			justify-content: flex-start;
		}
	}
</style>
