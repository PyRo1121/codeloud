<script lang="ts">
	import { resolve } from "$app/paths";
	import FamilyDemo from "$lib/components/FamilyDemo.svelte";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import { productFor } from "$lib/domain/product-catalog";

	const relay = productFor("relay");
</script>

<svelte:head>
	<title>CodeLoud | Stop Correcting and Fact-Checking Coding Agents</title>
	<meta
		name="description"
		content="CodeLoud Voice makes spoken developer intent reviewable. Relay gives coding agents exact-version, sourced technical context."
	/>
	<link rel="canonical" href="https://codeloud.xyz/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:title" content="Stop correcting and fact-checking your coding agent" />
	<meta
		property="og:description"
		content="Voice fixes the input. Relay verifies the technical context."
	/>
	<meta property="og:url" content="https://codeloud.xyz/" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Stop correcting and fact-checking your coding agent" />
	<meta
		name="twitter:description"
		content="Voice fixes the input. Relay verifies the technical context."
	/>
	<meta name="twitter:image" content="https://codeloud.xyz/og-codeloud.png" />
</svelte:head>

<SiteHeader />

<main>
	<section class="hero page-shell" aria-labelledby="hero-title">
		<div class="hero-copy">
			<h1 id="hero-title">Fix what your agent heard. Verify what it found.</h1>
			<div class="hero-intro">
				<p>
					Voice reviews developer intent. Relay returns exact-version, sourced technical context.
				</p>
				<div class="hero-actions">
					<a class="primary-action" href={resolve("/early-access")}
						><span>Request early access</span><b aria-hidden="true">↗</b></a
					>
					<a class="secondary-action" href="#products">Product details <span>↓</span></a>
				</div>
			</div>
		</div>
		<FamilyDemo />
	</section>

	<section id="products" class="products page-shell" aria-labelledby="products-title">
		<header>
			<h2 id="products-title">Fix the input. Verify the context.</h2>
			<p>Use either product on its own, or remove both sources of correction work.</p>
		</header>

		<div class="product-pair">
			<article class="product product-voice">
				<div class="product-index"><span>01</span><i></i></div>
				<div>
					<p>CodeLoud Voice <small>Private development</small></p>
					<h3>Stop cleaning up dictation before your agent can use it.</h3>
					<span>
						Review project terms, identifiers, paths, and commands before the text reaches your
						editor or agent.
					</span>
					<div class="product-actions">
						<a href={resolve("/voice")}>Explore Voice →</a>
						<a href={resolve("/early-access?product=voice")}>Request access ↗</a>
					</div>
				</div>
			</article>

			<article class="product product-relay">
				<div class="product-index"><span>02</span><i></i></div>
				<div>
					<p>CodeLoud Relay <small>Private beta</small></p>
					<h3>Stop checking whether your agent found the right documentation.</h3>
					<span>
						Resolve exact versions first, then return bounded passages with source locators and
						evidence status.
					</span>
					<div class="product-actions">
						<a href={resolve("/relay")}>Explore Relay →</a>
						<a href={relay.applyUrl} target="_blank" rel="external noopener">Apply for beta ↗</a>
					</div>
				</div>
			</article>
		</div>
	</section>

	<section class="audiences page-shell" aria-labelledby="audiences-title">
		<div class="audience-primary">
			<span>Built first for</span>
			<h2 id="audiences-title">Developers who are still in the loop.</h2>
			<p>You direct the agent. CodeLoud removes the repetitive cleanup around that work.</p>
		</div>
		<div class="audience-secondary">
			<div>
				<span>Engineering teams</span>
				<p>Make input review and technical evidence easier to inspect across agent workflows.</p>
			</div>
			<div>
				<span>Tool builders</span>
				<p>Add developer-aware input or sourced context without rebuilding every workflow.</p>
			</div>
		</div>
	</section>

	<section class="closing page-shell" aria-labelledby="closing-title">
		<div>
			<h2 id="closing-title">Give your agent less to get wrong.</h2>
			<p>Tell us which correction loop costs you the most time.</p>
		</div>
		<a class="primary-action" href={resolve("/early-access")}
			><span>Request early access</span><b aria-hidden="true">↗</b></a
		>
	</section>
</main>

<SiteFooter />

<style>
	.hero {
		display: grid;
		align-content: center;
		gap: clamp(2rem, 4vw, 3.25rem);
		min-height: calc(100dvh - 5.25rem);
		padding-block: 2.75rem 3.5rem;
	}

	.hero-copy {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.65fr);
		gap: clamp(2rem, 7vw, 7rem);
		align-items: end;
	}

	h1 {
		margin: 0;
		font-size: clamp(3rem, 3.7vw, 4rem);
		font-weight: 660;
		line-height: 0.92;
		letter-spacing: -0.065em;
		text-wrap: balance;
	}

	.hero-intro > p {
		max-width: 40ch;
		margin: 0;
		color: var(--muted);
		font-size: clamp(0.95rem, 1.2vw, 1.1rem);
	}

	.hero-actions,
	.product-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		align-items: center;
	}

	.hero-actions {
		margin-top: 1.5rem;
	}

	.primary-action {
		display: inline-flex;
		gap: 1rem;
		align-items: center;
		border: 1px solid var(--accent);
		background: var(--accent);
		padding: 0.72rem 0.85rem 0.72rem 1rem;
		color: #111;
		font-size: 0.76rem;
		font-weight: 740;
		text-decoration: none;
		transition:
			background 180ms cubic-bezier(0.16, 1, 0.3, 1),
			color 180ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.primary-action b {
		font-size: 0.95rem;
		transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.primary-action:hover {
		background: transparent;
		color: var(--text);
	}

	.primary-action:hover b {
		transform: translate(2px, -2px);
	}

	.primary-action:active {
		transform: translateY(1px);
	}

	.secondary-action {
		padding: 0.7rem 0.25rem;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.64rem;
		text-decoration: none;
	}

	.secondary-action:hover {
		color: var(--text);
	}

	.secondary-action span {
		margin-left: 0.4rem;
		color: var(--accent);
	}

	.products,
	.audiences,
	.closing {
		border-top: 1px solid var(--line);
	}

	.products {
		padding-block: 5.5rem 6.5rem;
	}

	.products > header {
		max-width: 44rem;
	}

	.products > header h2,
	.audience-primary h2,
	.closing h2 {
		margin: 0;
		font-size: clamp(2.4rem, 4vw, 4.3rem);
		font-weight: 640;
		line-height: 0.98;
		letter-spacing: -0.055em;
		text-wrap: balance;
	}

	.products > header p,
	.audience-primary > p,
	.closing p {
		max-width: 48ch;
		margin: 1rem 0 0;
		color: var(--muted);
	}

	.product-pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(2rem, 5vw, 5rem);
		margin-top: 4rem;
	}

	.product {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 1.4rem;
	}

	.product-index {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.62rem;
	}

	.product-index i {
		width: 1px;
		height: 100%;
		min-height: 15rem;
		background: linear-gradient(var(--accent), transparent);
	}

	.product p {
		display: flex;
		gap: 0.8rem;
		align-items: center;
		margin: 0;
		font-size: 0.88rem;
		font-weight: 700;
	}

	.product p small {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.57rem;
		font-weight: 400;
		text-transform: uppercase;
	}

	.product h3 {
		max-width: 16ch;
		margin: 1.4rem 0 0;
		font-size: clamp(1.7rem, 2.8vw, 3rem);
		font-weight: 620;
		line-height: 1.04;
		letter-spacing: -0.045em;
	}

	.product > div:last-child > span {
		display: block;
		max-width: 45ch;
		margin-top: 1.25rem;
		color: var(--muted);
		font-size: 0.86rem;
	}

	.product-actions {
		margin-top: 1.8rem;
	}

	.product-actions a {
		border-bottom: 1px solid var(--line-strong);
		padding-bottom: 0.3rem;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.64rem;
		text-decoration: none;
	}

	.product-actions a:hover {
		border-color: var(--accent);
		color: var(--text);
	}

	.audiences {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: clamp(3rem, 9vw, 9rem);
		padding-block: 5rem;
	}

	.audience-primary > span,
	.audience-secondary span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.audience-primary h2 {
		max-width: 12ch;
		margin-top: 1rem;
		font-size: clamp(2.2rem, 3.5vw, 3.7rem);
	}

	.audience-secondary {
		display: grid;
		align-content: end;
	}

	.audience-secondary > div {
		display: grid;
		grid-template-columns: 9rem 1fr;
		gap: 1.5rem;
		border-top: 1px solid var(--line);
		padding: 1.2rem 0;
	}

	.audience-secondary p {
		margin: 0;
		color: var(--muted);
		font-size: 0.82rem;
	}

	.closing {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
		padding-block: 4.5rem;
	}

	.closing h2 {
		font-size: clamp(2.1rem, 3.5vw, 3.7rem);
	}

	@media (max-width: 960px) {
		.hero {
			min-height: auto;
		}

		.hero-copy {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	@media (max-width: 760px) {
		.hero {
			padding-block: 3rem 4rem;
		}

		h1 {
			max-width: 16ch;
			font-size: clamp(2.55rem, 11vw, 3.6rem);
			line-height: 0.96;
		}

		.product-pair,
		.audiences {
			grid-template-columns: 1fr;
		}

		.product-pair {
			gap: 3.5rem;
		}

		.audiences {
			gap: 3.5rem;
		}

		.closing {
			align-items: flex-start;
			flex-direction: column;
		}
	}

	@media (max-width: 520px) {
		.hero-actions {
			align-items: flex-start;
			flex-direction: column;
		}

		.product {
			grid-template-columns: 2rem 1fr;
		}

		.audience-secondary > div {
			grid-template-columns: 1fr;
			gap: 0.6rem;
		}
	}
</style>
