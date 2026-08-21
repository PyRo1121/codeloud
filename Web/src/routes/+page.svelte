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
	let contactFormOverride = $state<boolean | null>(null);
	let contactResultOpen = $derived(Boolean(form && "kind" in form && form.kind === "contact"));
	let contactFormExpanded = $derived(contactFormOverride ?? contactResultOpen);

	function selectInterest(selection: InterestSelection): void {
		interestProduct = selection;
	}

	function requestInterest(selection: ProductId): void {
		interestProduct = selection;
		contactFormOverride = true;
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	function handleContactToggle(event: Event): void {
		if (event.currentTarget instanceof HTMLDetailsElement) {
			contactFormOverride = event.currentTarget.open;
		}
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
			<p>
				Two tools for the unreliable edges of agent work: what you meant and what the agent knows.
			</p>
			<div class="hero-links">
				<a href="#products">Meet Voice + Relay <span aria-hidden="true">↓</span></a>
				<a href="#signal">Send a signal <span aria-hidden="true">↘</span></a>
			</div>
		</div>

		<aside class="handoff-record" aria-label="An illustrative CodeLoud handoff record">
			<header><span>HANDOFF / 0042</span><span>source matched</span></header>
			<div><span>01 / heard</span><code>add retries to the relay client</code></div>
			<div class="reviewed">
				<span>02 / reviewed</span><code>add retries to <b>RelayClient</b></code>
			</div>
			<div><span>03 / grounded</span><code><b>workers@4.123.0</b> · exact version</code></div>
			<footer><span>VOICE → HUMAN CHECK → RELAY</span><span>evidence attached</span></footer>
		</aside>
	</section>

	<section id="products" class="products page-shell" aria-labelledby="products-title">
		<header class="section-heading">
			<div>
				<p class="mono-label">Two tools / one handoff</p>
				<h2 id="products-title">Less guessing at both ends.</h2>
			</div>
			<p>Voice cleans up developer input. Relay brings exact, sourced context. Each has one job.</p>
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

	<section id="signal" class="signal-section page-shell" aria-labelledby="signal-title">
		<header class="section-heading signal-heading">
			<div>
				<p class="mono-label">No-contact signal</p>
				<h2 id="signal-title">Where does your workflow drag?</h2>
			</div>
			<p>Two choices. No account. We retain only a daily aggregate.</p>
		</header>
		<InterestSignalForm siteKey={data.turnstileSiteKey} result={form} />
	</section>

	<section id="contact" class="contact-section page-shell">
		<details open={contactFormExpanded} ontoggle={handleContactToggle}>
			<summary>
				<span><small>Early access / optional</small>Want a reply from a person?</span>
				<b>{contactFormExpanded ? "Close form ↑" : "Open contact form ↓"}</b>
			</summary>
			<div class="contact-form-shell">
				<p>
					Separate from the anonymous signal. Tell us what you would test and leave a way to reach
					you.
				</p>
				<EarlyAccessForm
					siteKey={data.turnstileSiteKey}
					selection={interestProduct}
					result={form}
					onSelect={selectInterest}
				/>
			</div>
		</details>
	</section>
</main>

<SiteFooter />

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(24rem, 0.95fr);
		gap: clamp(3rem, 8vw, 8rem);
		align-items: center;
		min-height: 38rem;
		padding-block: 4.5rem 5.5rem;
	}

	.hero-copy .mono-label,
	.section-heading .mono-label {
		margin: 0 0 1.25rem;
		color: var(--accent);
	}

	.hero h1 {
		max-width: 10ch;
		margin: 0;
		font-size: clamp(4rem, 7.5vw, 7.8rem);
		font-weight: 650;
		line-height: 0.82;
		letter-spacing: -0.085em;
	}

	.hero-copy > p:last-of-type {
		max-width: 42ch;
		margin: 2rem 0 0;
		color: var(--muted);
		font-size: 1.05rem;
	}

	.hero-links {
		display: flex;
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.hero-links a {
		border-bottom: 1px solid var(--line-strong);
		padding-bottom: 0.3rem;
		font-family: var(--mono);
		font-size: 0.67rem;
		text-decoration: none;
	}

	.hero-links a:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.hero-links span {
		margin-left: 0.4rem;
	}

	.handoff-record {
		border: 1px solid var(--line-strong);
		background: var(--paper-raised);
		box-shadow: 0.8rem 0.8rem 0 var(--ink-shadow);
		transform: rotate(1deg);
	}

	.handoff-record header,
	.handoff-record footer,
	.handoff-record > div {
		display: grid;
		grid-template-columns: 7rem 1fr;
		gap: 1rem;
		padding: 0.9rem 1rem;
	}

	.handoff-record header,
	.handoff-record footer {
		grid-template-columns: 1fr auto;
		font-family: var(--mono);
		font-size: 0.58rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.handoff-record header {
		border-bottom: 2px solid var(--text);
	}

	.handoff-record header span:last-child {
		color: var(--positive);
	}

	.handoff-record > div {
		border-bottom: 1px solid var(--line);
	}

	.handoff-record > div > span {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.58rem;
		text-transform: uppercase;
	}

	.handoff-record code {
		font-family: var(--mono);
		font-size: 0.73rem;
	}

	.handoff-record .reviewed {
		background: var(--accent-soft);
	}

	.handoff-record footer {
		color: var(--muted);
	}

	.products,
	.signal-section,
	.contact-section {
		border-top: 1px solid var(--line-strong);
		padding-block: 4.5rem 5.5rem;
	}

	.section-heading {
		display: grid;
		grid-template-columns: 1fr minmax(16rem, 0.55fr);
		gap: 3rem;
		align-items: end;
		margin-bottom: 3rem;
	}

	.section-heading h2 {
		max-width: 13ch;
		margin: 0;
		font-size: clamp(2.5rem, 4.5vw, 4.7rem);
		font-weight: 640;
		line-height: 0.9;
		letter-spacing: -0.065em;
	}

	.section-heading > p {
		max-width: 36ch;
		margin: 0;
		color: var(--muted);
	}

	.product-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--line-strong);
	}

	.signal-section {
		display: grid;
		grid-template-columns: minmax(18rem, 0.7fr) 1.3fr;
		gap: clamp(3rem, 8vw, 8rem);
	}

	.signal-heading {
		display: block;
		margin: 0;
	}

	.signal-heading > p {
		margin-top: 1.5rem;
	}

	.contact-section {
		padding-block: 2.5rem 4rem;
	}

	details {
		border-top: 3px solid var(--text);
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1.3rem 0;
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary > span {
		display: flex;
		gap: 2rem;
		align-items: baseline;
		font-size: clamp(1.4rem, 2.5vw, 2.4rem);
		font-weight: 650;
		letter-spacing: -0.04em;
	}

	summary small,
	summary b {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.63rem;
		font-weight: 400;
		text-transform: uppercase;
	}

	.contact-form-shell {
		display: grid;
		grid-template-columns: minmax(14rem, 0.55fr) 1.45fr;
		gap: clamp(3rem, 8vw, 8rem);
		padding-block: 2rem 3rem;
	}

	.contact-form-shell > p {
		max-width: 34ch;
		margin: 0;
		color: var(--muted);
	}

	@media (max-width: 900px) {
		.hero,
		.signal-section,
		.contact-form-shell {
			grid-template-columns: 1fr;
		}

		.hero {
			min-height: auto;
		}

		.handoff-record {
			width: min(100% - 1rem, 38rem);
		}

		.product-list {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 620px) {
		.hero {
			gap: 3.5rem;
			padding-block: 3.5rem 4.5rem;
		}

		.hero h1 {
			font-size: clamp(3.5rem, 18vw, 5.2rem);
		}

		.hero-links,
		summary > span {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.8rem;
		}

		.handoff-record > div,
		.handoff-record header,
		.handoff-record footer {
			grid-template-columns: 1fr;
			gap: 0.45rem;
		}

		.products,
		.signal-section {
			padding-block: 3.5rem 4rem;
		}

		.section-heading {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			margin-bottom: 2.5rem;
		}

		summary {
			align-items: flex-start;
		}
	}
</style>
