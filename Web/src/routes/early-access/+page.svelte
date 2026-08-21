<script lang="ts">
	import { untrack } from "svelte";
	import EarlyAccessForm from "$lib/components/EarlyAccessForm.svelte";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import type { InterestSelection } from "$lib/domain/products";
	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
	let selection = $state<InterestSelection>(untrack(() => data.initialProduct));

	function selectProduct(nextSelection: InterestSelection): void {
		selection = nextSelection;
	}
</script>

<svelte:head>
	<title>Request Early Access | CodeLoud</title>
	<meta
		name="description"
		content="Request early access to CodeLoud Voice, Relay, or the complete product family."
	/>
	<meta name="robots" content="noindex,follow" />
	<link rel="canonical" href="https://codeloud.xyz/early-access" />
	<meta property="og:title" content="Request Early Access | CodeLoud" />
	<meta property="og:description" content="Tell CodeLoud what you want to test first." />
	<meta property="og:url" content="https://codeloud.xyz/early-access" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:card" content="summary_large_image" />
	{#if data.turnstileSiteKey}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
	{/if}
</svelte:head>

<SiteHeader active="early-access" />

<main class="access-page page-shell">
	<header>
		<p>Early access</p>
		<h1>Tell us what you want to stop fixing by hand.</h1>
		<span>
			Choose Voice, Relay, or both. A person reviews every request; submitting does not guarantee
			early access.
		</span>
	</header>
	<EarlyAccessForm
		siteKey={data.turnstileSiteKey}
		{selection}
		result={form}
		onSelect={selectProduct}
	/>
</main>

<SiteFooter />

<style>
	.access-page {
		display: grid;
		grid-template-columns: minmax(18rem, 0.7fr) minmax(24rem, 1.3fr);
		gap: clamp(3rem, 8vw, 8rem);
		padding-block: 5rem 7rem;
	}

	header {
		align-self: start;
		padding-top: 0.9rem;
	}

	header > p {
		margin: 0 0 1.5rem;
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.68rem;
		text-transform: uppercase;
	}

	h1 {
		max-width: 11ch;
		margin: 0;
		font-size: clamp(2.8rem, 5vw, 5rem);
		font-weight: 650;
		line-height: 0.92;
		letter-spacing: -0.065em;
	}

	header > span {
		display: block;
		max-width: 40ch;
		margin-top: 1.6rem;
		color: var(--muted);
	}

	@media (max-width: 800px) {
		.access-page {
			grid-template-columns: 1fr;
			padding-block: 3.5rem 5rem;
		}
	}
</style>
