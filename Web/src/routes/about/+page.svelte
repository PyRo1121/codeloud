<script lang="ts">
	import { resolve } from "$app/paths";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import { SITE_ORIGIN, SOCIAL_IMAGE_URL, organizationPageStructuredData } from "$lib/domain/seo";

	const structuredData = organizationPageStructuredData();
</script>

<svelte:head>
	<title>About CodeLoud | Reliable Input and Context for Coding Agents</title>
	<meta
		name="description"
		content="CodeLoud builds developer tools that make coding-agent instructions reviewable and technical context inspectable."
	/>
	<link rel="canonical" href={`${SITE_ORIGIN}/about`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content="About CodeLoud" />
	<meta
		property="og:description"
		content="Developer tools for reliable coding-agent input and inspectable technical context."
	/>
	<meta property="og:url" content={`${SITE_ORIGIN}/about`} />
	<meta property="og:image" content={SOCIAL_IMAGE_URL} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="CodeLoud product family overview" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About CodeLoud" />
	<meta
		name="twitter:description"
		content="Developer tools for reliable coding-agent input and inspectable technical context."
	/>
	<meta name="twitter:image" content={SOCIAL_IMAGE_URL} />
	<meta name="twitter:image:alt" content="CodeLoud product family overview" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted repository-owned JSON-LD -->
	{@html '<script type="application/ld+json">' + structuredData + "<" + "/script>"}
</svelte:head>

<SiteHeader />

<main class="about page-shell">
	<header>
		<p>About CodeLoud</p>
		<h1>Developer tools for coding agents you can direct and verify.</h1>
		<span>
			CodeLoud focuses on two correction loops: what reaches the agent and what the agent uses as
			technical context.
		</span>
	</header>

	<section aria-labelledby="family-title">
		<div>
			<span>01 / The family</span>
			<h2 id="family-title">Voice improves the instruction. Relay improves the evidence.</h2>
		</div>
		<div class="copy">
			<p>
				<a href={resolve("/voice")}>CodeLoud Voice</a> turns spoken developer intent into reviewable,
				code-aware text before it reaches an editor or coding agent.
			</p>
			<p>
				<a href={resolve("/relay")}>CodeLoud Relay</a> gives coding agents exact-version documentation,
				sourced technical research, package evidence, and explicit support status through MCP.
			</p>
		</div>
	</section>

	<section aria-labelledby="principles-title">
		<div>
			<span>02 / Product principles</span>
			<h2 id="principles-title">Make uncertainty visible.</h2>
		</div>
		<ul>
			<li>
				<strong>Human review</strong>
				<p>Keep proposed input corrections visible before insertion.</p>
			</li>
			<li>
				<strong>Resolved identity</strong>
				<p>Determine the package or version before retrieving documentation.</p>
			</li>
			<li>
				<strong>Bounded evidence</strong>
				<p>
					Return inspectable passages and source locations instead of an unlabeled context dump.
				</p>
			</li>
			<li>
				<strong>Explicit boundaries</strong>
				<p>Do not claim that grounded context verifies the agent's final code or answer.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="research-title">
		<div>
			<span>03 / Research</span>
			<h2 id="research-title">Publish the reasoning, not keyword filler.</h2>
		</div>
		<div class="copy">
			<p>
				The
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- canonical static guide index -->
				<a href="/guides">CodeLoud guides</a> explain the problems behind the products using primary sources
				and concrete workflows. They distinguish sourced facts from CodeLoud's product decisions and avoid
				unsupported performance or security claims.
			</p>
			<p>
				Product boundaries and data handling remain public in the <a href={resolve("/privacy")}
					>privacy notice</a
				>.
			</p>
		</div>
	</section>
</main>

<SiteFooter />

<style>
	.about {
		padding-block: 5rem 7rem;
	}

	.about > header {
		max-width: 70rem;
		padding-bottom: 6rem;
	}

	.about > header > p,
	.about section > div:first-child > span {
		margin: 0;
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.64rem;
		text-transform: uppercase;
	}

	h1 {
		max-width: 20ch;
		margin: 1.2rem 0 0;
		font-size: clamp(3.2rem, 5vw, 5.5rem);
		font-weight: 650;
		line-height: 0.9;
		letter-spacing: -0.075em;
		text-wrap: balance;
	}

	.about > header > span {
		display: block;
		max-width: 52ch;
		margin-top: 2rem;
		color: var(--muted);
		font-size: clamp(1rem, 1.5vw, 1.25rem);
	}

	.about section {
		display: grid;
		grid-template-columns: minmax(15rem, 0.7fr) minmax(0, 1.3fr);
		gap: clamp(3rem, 8vw, 8rem);
		border-top: 1px solid var(--line-strong);
		padding-block: 5rem;
	}

	.about h2 {
		max-width: 13ch;
		margin: 1rem 0 0;
		font-size: clamp(2.2rem, 4vw, 4rem);
		font-weight: 630;
		line-height: 0.98;
		letter-spacing: -0.06em;
	}

	.copy {
		max-width: 46rem;
	}

	.copy p {
		margin: 0 0 1.5rem;
		color: var(--muted);
		font-size: clamp(1.1rem, 1.7vw, 1.4rem);
		line-height: 1.55;
	}

	.copy a {
		color: var(--text);
		text-decoration-color: var(--accent);
		text-underline-offset: 0.25rem;
	}

	.about ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.about li {
		display: grid;
		grid-template-columns: 10rem 1fr;
		gap: 2rem;
		border-top: 1px solid var(--line);
		padding: 1rem 0;
	}

	.about li strong {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.64rem;
		font-weight: 500;
		text-transform: uppercase;
	}

	.about li p {
		margin: 0;
		color: var(--muted);
	}

	@media (max-width: 760px) {
		.about {
			padding-block: 3.5rem 5rem;
		}

		h1 {
			font-size: clamp(2.8rem, 13vw, 4.5rem);
		}

		.about section {
			grid-template-columns: 1fr;
			padding-block: 4rem;
		}
	}

	@media (max-width: 520px) {
		.about li {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}
</style>
