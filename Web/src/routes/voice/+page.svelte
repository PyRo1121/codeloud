<script lang="ts">
	import ProductDetailPage from "$lib/components/ProductDetailPage.svelte";
	import { productPageFor } from "$lib/domain/product-pages";

	const page = productPageFor("voice");
</script>

<svelte:head>
	<title>Developer Dictation for Code | CodeLoud Voice</title>
	<meta name="description" content={page.description} />
	<link rel="canonical" href="https://codeloud.xyz/voice" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:title" content="Developer Dictation for Code | CodeLoud Voice" />
	<meta property="og:description" content={page.description} />
	<meta property="og:url" content="https://codeloud.xyz/voice" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Developer Dictation for Code | CodeLoud Voice" />
	<meta name="twitter:description" content={page.description} />
	<meta name="twitter:image" content="https://codeloud.xyz/og-codeloud.png" />
</svelte:head>

<ProductDetailPage {page} />
