<script lang="ts">
	import ProductDetailPage from "$lib/components/ProductDetailPage.svelte";
	import { productPageFor } from "$lib/domain/product-pages";
	import { productStructuredData } from "$lib/domain/seo";

	const page = productPageFor("voice");
	const structuredData = productStructuredData(page);
</script>

<svelte:head>
	<title>Voice Dictation for Coding Agents | CodeLoud Voice</title>
	<meta name="description" content={page.description} />
	<link rel="canonical" href="https://codeloud.xyz/voice" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content="Voice Dictation for Coding Agents | CodeLoud Voice" />
	<meta property="og:description" content={page.description} />
	<meta property="og:url" content="https://codeloud.xyz/voice" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="CodeLoud Voice and Relay product family overview" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Voice Dictation for Coding Agents | CodeLoud Voice" />
	<meta name="twitter:description" content={page.description} />
	<meta name="twitter:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:image:alt" content="CodeLoud Voice and Relay product family overview" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted repository-owned JSON-LD -->
	{@html '<script type="application/ld+json">' + structuredData + "<" + "/script>"}
</svelte:head>

<ProductDetailPage {page} />
