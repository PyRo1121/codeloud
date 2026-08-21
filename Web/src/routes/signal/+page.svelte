<script lang="ts">
	import InterestSignalForm from "$lib/components/InterestSignalForm.svelte";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Help Shape the Roadmap | CodeLoud</title>
	<meta
		name="description"
		content="Send CodeLoud an anonymous, aggregate-only signal about the coding-agent problem costing you the most time."
	/>
	<meta name="robots" content="noindex,follow" />
	<link rel="canonical" href="https://codeloud.xyz/signal" />
	<meta property="og:title" content="Help Shape the CodeLoud Roadmap" />
	<meta property="og:description" content="Two choices, no account, aggregate-only storage." />
	<meta property="og:url" content="https://codeloud.xyz/signal" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:card" content="summary_large_image" />
	{#if data.turnstileSiteKey}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
	{/if}
</svelte:head>

<SiteHeader active="signal" />

<main class="signal-page page-shell">
	<header>
		<p>Help shape the roadmap</p>
		<h1>What keeps slowing your agent workflow down?</h1>
		<span>
			Two choices give us a demand signal without requiring an email or account. We retain only a
			daily aggregate of the selected choices.
		</span>
	</header>
	<InterestSignalForm siteKey={data.turnstileSiteKey} result={form} />
</main>

<SiteFooter />

<style>
	.signal-page {
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
		.signal-page {
			grid-template-columns: 1fr;
			padding-block: 3.5rem 5rem;
		}
	}
</style>
