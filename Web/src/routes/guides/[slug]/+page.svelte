<script lang="ts">
	import GuidePage from "$lib/components/GuidePage.svelte";
	import type { PageProps } from "./$types";

	let { data: pageData }: PageProps = $props();
</script>

<GuidePage guide={pageData.guide} />
