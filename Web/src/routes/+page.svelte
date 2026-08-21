<script lang="ts">
	import EarlyAccessForm from "$lib/components/EarlyAccessForm.svelte";
	import InterestSignalForm from "$lib/components/InterestSignalForm.svelte";
	import ProductPanel from "$lib/components/ProductPanel.svelte";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import { contentForProduct } from "$lib/domain/product-content";
	import { PRODUCTS, type ProductId } from "$lib/domain/product-catalog";
	import type { InterestSelection } from "$lib/domain/products";
	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
	let interestProduct = $state<InterestSelection>("both");

	function selectInterest(selection: InterestSelection): void {
		interestProduct = selection;
	}

	function requestInterest(selection: ProductId): void {
		interestProduct = selection;
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
	}
</script>

<svelte:head>
	<title>CodeLoud | The missing layer between developers and coding agents</title>
	<meta
		name="description"
		content="CodeLoud Voice improves what goes in. CodeLoud Relay improves the technical context coding agents can work from."
	/>
	<link rel="canonical" href="https://codeloud.xyz/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:title" content="CodeLoud | Voice and Relay for coding agents" />
	<meta
		property="og:description"
		content="CodeLoud Voice improves what goes in. CodeLoud Relay improves what the agent can work from."
	/>
	<meta property="og:url" content="https://codeloud.xyz/" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="CodeLoud | Voice and Relay for coding agents" />
	<meta
		name="twitter:description"
		content="Developer dictation and exact-version technical context for coding agents."
	/>
	<meta name="twitter:image" content="https://codeloud.xyz/og-codeloud.png" />
	{#if data.turnstileSiteKey}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
	{/if}
</svelte:head>

<SiteHeader />

<main>
	<section class="hero page-shell" aria-labelledby="hero-title">
		<div class="hero-copy">
			<p class="mono-label">Voice input / verified context</p>
			<h1 id="hero-title">Say the code.<br />Show the source.</h1>
			<p class="hero-intro">
				CodeLoud makes two unreliable parts of agent work easier to inspect: what you meant and what
				the agent knows.
			</p>
			<div class="hero-links">
				<a href="#products">Meet the products <span aria-hidden="true">↓</span></a>
				<a href="#signal">Tell us what breaks <span aria-hidden="true">↘</span></a>
			</div>
		</div>

		<aside class="handoff-record" aria-label="An illustrative CodeLoud handoff record">
			<header>
				<span>HANDOFF / 0042</span>
				<span class="record-state">source matched</span>
			</header>
			<div class="record-row record-raw">
				<span>01 / heard</span>
				<code>add retries to the relay client</code>
			</div>
			<div class="record-row record-review">
				<span>02 / reviewed</span>
				<code>add retries to <mark>RelayClient</mark></code>
			</div>
			<div class="record-row record-source">
				<span>03 / grounded</span>
				<p><b>workers@4.123.0</b><br />2 bounded passages · exact version</p>
			</div>
			<footer>
				<span>VOICE → HUMAN CHECK → RELAY</span>
				<span>evidence stays attached</span>
			</footer>
		</aside>
	</section>

	<section id="products" class="product-section page-shell" aria-labelledby="products-title">
		<header class="section-heading">
			<p class="mono-label">Two tools / one handoff</p>
			<h2 id="products-title">Less guessing at both ends.</h2>
			<p>
				Voice handles developer language before it reaches the agent. Relay handles technical
				context before the agent relies on it.
			</p>
		</header>
		<div class="product-list">
			{#each PRODUCTS as product (product.id)}
				<ProductPanel
					{product}
					content={contentForProduct(product.id)}
					onInterest={requestInterest}
				/>
			{/each}
		</div>
	</section>

	<section class="method page-shell" aria-labelledby="method-title">
		<header>
			<p class="mono-label">The method</p>
			<h2 id="method-title">Uncertainty should be visible, not smoothed over.</h2>
		</header>
		<ol>
			<li>
				<span>01</span><strong>Capture</strong>
				<p>Start with the prompt, path, package, command, or rough idea.</p>
			</li>
			<li>
				<span>02</span><strong>Check</strong>
				<p>Keep uncertain terms reviewable before they become instructions.</p>
			</li>
			<li>
				<span>03</span><strong>Ground</strong>
				<p>Attach exact, sourced context before the agent acts.</p>
			</li>
		</ol>
	</section>

	<section
		id="signal"
		class="form-section signal-section page-shell"
		aria-labelledby="signal-title"
	>
		<header class="form-heading">
			<p class="mono-label">No-contact signal</p>
			<h2 id="signal-title">Where does your workflow drag?</h2>
			<p>
				Two choices are more useful than another email signup. We keep only daily aggregates and do
				not publish small totals.
			</p>
		</header>
		<InterestSignalForm siteKey={data.turnstileSiteKey} result={form} />
	</section>

	<section
		id="contact"
		class="form-section contact-section page-shell"
		aria-labelledby="contact-title"
	>
		<header class="form-heading">
			<p class="mono-label">Early access / optional</p>
			<h2 id="contact-title">Want a reply from a person?</h2>
			<p>
				This is separate from the anonymous signal. Tell us what you would test and leave a way to
				reach you.
			</p>
		</header>
		<EarlyAccessForm
			siteKey={data.turnstileSiteKey}
			selection={interestProduct}
			result={form}
			onSelect={selectInterest}
		/>
	</section>

	<aside class="boundary-note page-shell" aria-labelledby="boundary-title">
		<p class="mono-label">A useful boundary</p>
		<h2 id="boundary-title">Voice is honest about its providers.</h2>
		<p>
			Voice currently uses external speech providers. Retention and training-use policies vary, so
			CodeLoud does not make a universal zero-retention claim. Do not dictate credentials, secrets,
			or sensitive source material before reviewing the applicable provider policy.
		</p>
	</aside>
</main>

<SiteFooter />

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(25rem, 0.95fr);
		gap: clamp(3rem, 8vw, 8rem);
		align-items: center;
		min-height: 43rem;
		padding-block: 5.5rem 6.5rem;
	}

	.hero-copy .mono-label {
		margin: 0 0 1.6rem;
		color: var(--accent);
	}

	.hero h1 {
		max-width: 10ch;
		margin: 0;
		font-size: clamp(4rem, 8vw, 8.4rem);
		font-weight: 650;
		line-height: 0.82;
		letter-spacing: -0.085em;
		text-wrap: balance;
	}

	.hero-intro {
		max-width: 43ch;
		margin: 2.4rem 0 0;
		color: var(--muted);
		font-size: clamp(1.05rem, 1.5vw, 1.3rem);
		line-height: 1.45;
	}

	.hero-links {
		display: flex;
		gap: 1.8rem;
		margin-top: 2.5rem;
	}

	.hero-links a {
		border-bottom: 1px solid var(--text);
		padding-bottom: 0.35rem;
		font-family: var(--mono);
		font-size: 0.68rem;
		text-decoration: none;
		transition:
			border-color 160ms ease,
			color 160ms ease;
	}

	.hero-links a:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.hero-links span {
		margin-left: 0.45rem;
	}

	.handoff-record {
		position: relative;
		border: 1px solid var(--line-strong);
		background: var(--paper-raised);
		box-shadow: 1rem 1rem 0 var(--ink-shadow);
		transform: rotate(1.2deg);
	}

	.handoff-record::before {
		position: absolute;
		top: -1rem;
		left: 12%;
		width: 6rem;
		height: 1.8rem;
		background: rgb(218 207 176 / 72%);
		content: "";
		transform: rotate(-4deg);
	}

	.handoff-record header,
	.handoff-record footer,
	.record-row {
		padding: 1rem 1.2rem;
	}

	.handoff-record header,
	.handoff-record footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-family: var(--mono);
		font-size: 0.6rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.handoff-record header {
		border-bottom: 2px solid var(--text);
	}

	.record-state {
		color: var(--positive);
	}

	.record-row {
		display: grid;
		grid-template-columns: 6.5rem 1fr;
		gap: 1rem;
		align-items: baseline;
		border-bottom: 1px solid var(--line);
	}

	.record-row > span {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.6rem;
		text-transform: uppercase;
	}

	.record-row code,
	.record-row p {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.78rem;
	}

	.record-row mark {
		background: var(--accent-soft);
		color: var(--text);
	}

	.record-review {
		background: var(--accent-soft);
	}

	.record-source {
		min-height: 7rem;
		align-items: center;
	}

	.record-source p {
		line-height: 1.8;
	}

	.handoff-record footer {
		color: var(--muted);
	}

	.product-section,
	.method,
	.form-section,
	.boundary-note {
		border-top: 1px solid var(--line-strong);
	}

	.product-section {
		display: grid;
		grid-template-columns: minmax(15rem, 0.45fr) minmax(0, 1.55fr);
		gap: clamp(3rem, 8vw, 8rem);
		padding-block: 6.5rem 8rem;
	}

	.section-heading {
		position: sticky;
		top: 2rem;
		align-self: start;
	}

	.section-heading .mono-label,
	.form-heading .mono-label,
	.method .mono-label,
	.boundary-note .mono-label {
		margin: 0;
		color: var(--accent);
	}

	.section-heading h2,
	.form-heading h2,
	.method h2,
	.boundary-note h2 {
		margin: 1.1rem 0 0;
		font-size: clamp(2.3rem, 4.5vw, 4.8rem);
		font-weight: 640;
		line-height: 0.92;
		letter-spacing: -0.065em;
		text-wrap: balance;
	}

	.section-heading > p:last-child,
	.form-heading > p:last-child {
		max-width: 36ch;
		margin: 1.7rem 0 0;
		color: var(--muted);
	}

	.product-list {
		display: grid;
		gap: 6rem;
	}

	.method {
		display: grid;
		grid-template-columns: minmax(15rem, 0.65fr) 1.35fr;
		gap: clamp(3rem, 8vw, 8rem);
		padding-block: 6rem;
	}

	.method h2 {
		max-width: 12ch;
		font-size: clamp(2.2rem, 4vw, 4.2rem);
	}

	.method ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.method li {
		display: grid;
		grid-template-columns: 3rem 8rem 1fr;
		gap: 1rem;
		border-top: 1px solid var(--line-strong);
		padding: 1.4rem 0;
	}

	.method li span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.65rem;
	}

	.method li strong {
		font-size: 1.05rem;
	}

	.method li p {
		max-width: 40ch;
		margin: 0;
		color: var(--muted);
	}

	.form-section {
		display: grid;
		grid-template-columns: minmax(15rem, 0.65fr) 1.35fr;
		gap: clamp(3rem, 8vw, 8rem);
		padding-block: 6rem 7rem;
	}

	.form-heading h2 {
		max-width: 10ch;
	}

	.signal-section {
		background: linear-gradient(90deg, transparent 0 34%, var(--paper-raised) 34% 100%);
	}

	.contact-section {
		padding-top: 7rem;
	}

	.boundary-note {
		display: grid;
		grid-template-columns: 0.45fr 0.65fr 0.9fr;
		gap: clamp(2rem, 6vw, 6rem);
		align-items: start;
		padding-block: 4rem 6rem;
	}

	.boundary-note h2 {
		margin: 0;
		font-size: clamp(1.7rem, 3vw, 3rem);
	}

	.boundary-note > p:last-child {
		margin: 0;
		color: var(--muted);
		font-size: 0.86rem;
	}

	@media (max-width: 900px) {
		.hero,
		.product-section,
		.method,
		.form-section,
		.boundary-note {
			grid-template-columns: 1fr;
		}

		.hero {
			min-height: auto;
			padding-block: 4.5rem 6rem;
		}

		.handoff-record {
			width: min(100% - 1rem, 38rem);
		}

		.section-heading {
			position: static;
		}

		.signal-section {
			background: transparent;
		}
	}

	@media (max-width: 560px) {
		.hero {
			gap: 4rem;
		}

		.hero h1 {
			font-size: clamp(3.5rem, 18vw, 5.2rem);
		}

		.hero-links {
			align-items: flex-start;
			flex-direction: column;
			gap: 1rem;
		}

		.record-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}

		.handoff-record footer {
			align-items: flex-start;
			flex-direction: column;
		}

		.product-section,
		.method,
		.form-section {
			padding-block: 4.5rem 5.5rem;
		}

		.method li {
			grid-template-columns: 2rem 1fr;
		}

		.method li p {
			grid-column: 2;
		}
	}
</style>
