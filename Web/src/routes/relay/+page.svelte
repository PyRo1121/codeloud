<script lang="ts">
	import ProductDetailPage from "$lib/components/ProductDetailPage.svelte";
	import { productPageFor } from "$lib/domain/product-pages";

	const page = productPageFor("relay");
</script>

<svelte:head>
	<title>Exact-Version Documentation MCP | CodeLoud Relay</title>
	<meta name="description" content={page.description} />
	<link rel="canonical" href="https://codeloud.xyz/relay" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:title" content="Exact-Version Documentation MCP | CodeLoud Relay" />
	<meta property="og:description" content={page.description} />
	<meta property="og:url" content="https://codeloud.xyz/relay" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Exact-Version Documentation MCP | CodeLoud Relay" />
	<meta name="twitter:description" content={page.description} />
	<meta name="twitter:image" content="https://codeloud.xyz/og-codeloud.png" />
</svelte:head>

<ProductDetailPage {page} />
