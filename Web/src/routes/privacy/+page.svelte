<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<svelte:head>
	<title>Privacy Notice | CodeLoud</title>
	<meta
		name="description"
		content="How CodeLoud handles no-contact interest signals, early-access contact information, Turnstile verification, and product data."
	/>
	<link rel="canonical" href="https://codeloud.xyz/privacy" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:title" content="Privacy Notice | CodeLoud" />
	<meta
		property="og:description"
		content="How CodeLoud handles interest signals, contact information, and verification data."
	/>
	<meta property="og:url" content="https://codeloud.xyz/privacy" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<header class="privacy-header page-shell">
	<a href={resolve("/")}>CodeLoud</a>
	<nav aria-label="Privacy page navigation">
		<a href={resolve("/voice")}>Voice</a><a href={resolve("/relay")}>Relay</a>
	</nav>
</header>

<main class="privacy-page page-shell">
	<p class="mono-label">CodeLoud / privacy</p>
	<h1>Different signals carry different information.</h1>
	<p class="privacy-intro">
		CodeLoud separates lightweight demand measurement from requests to be contacted. This notice
		explains what each path retains.
	</p>

	<section>
		<p class="section-index">01 / No-contact signal</p>
		<h2>Choices become a daily aggregate.</h2>
		<p>
			The no-contact form records the selected problem, willingness to try an early build, and the
			calendar day. The database increments a grouped counter. It does not retain an individual
			event row, email address, name, IP address, or user agent for this signal.
		</p>
		<p>
			Because no persistent voter identifier is kept, these counts represent verified submissions,
			not guaranteed unique people.
		</p>
	</section>

	<section>
		<p class="section-index">02 / Early-access contact</p>
		<h2>Contact information is a separate choice.</h2>
		<p>
			The early-access form stores the email address, selected product, workflow description, and
			any optional name, operating-system, editor, coding-client, or private-source preference you
			provide. CodeLoud uses this information to understand demand and contact you about access.
		</p>
		<p>
			This table does not store audio, transcripts, source code, credentials, or Relay evidence.
		</p>
	</section>

	<section>
		<p class="section-index">03 / Abuse prevention and infrastructure</p>
		<h2>Cloudflare helps deliver and protect the site.</h2>
		<p>
			Both forms use Cloudflare Turnstile. A challenge token is validated server-side before a write
			is accepted. The no-contact signal does not send the request IP to Siteverify from the
			application server. Cloudflare may still process ordinary request and security metadata as the
			site, Worker, Turnstile, and D1 provider.
		</p>
	</section>

	<section>
		<p class="section-index">04 / Product boundaries</p>
		<h2>Voice and Relay have their own runtime data paths.</h2>
		<p>
			Voice currently uses external speech providers whose retention and training-use policies vary.
			Relay owns its authenticated account, API-key, research, and evidence boundaries. This public
			site does not make universal zero-retention claims for those separate services.
		</p>
	</section>

	<a class="privacy-back" href={resolve("/")}>Return to the family overview →</a>
</main>

<style>
	.privacy-header {
		display: flex;
		min-height: 5.5rem;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--line);
	}

	.privacy-header a {
		text-decoration: none;
	}

	.privacy-header > a {
		font-weight: 800;
	}

	.privacy-header nav {
		display: flex;
		gap: 1.4rem;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.68rem;
	}

	.privacy-page {
		padding-block: 6rem 8rem;
	}

	.privacy-page > .mono-label {
		color: var(--voice);
	}

	h1 {
		max-width: 12ch;
		margin: 1.5rem 0 0;
		font-size: clamp(3.7rem, 8vw, 8rem);
		font-weight: 540;
		line-height: 0.9;
		letter-spacing: -0.075em;
	}

	.privacy-intro {
		max-width: 50ch;
		margin: 2.5rem 0 7rem;
		color: var(--muted);
		font-size: 1.2rem;
	}

	section {
		display: grid;
		grid-template-columns: minmax(12rem, 0.65fr) 0.8fr 1.2fr;
		gap: 2.5rem;
		border-top: 1px solid var(--line);
		padding-block: 3rem;
	}

	section h2,
	section p {
		margin: 0;
	}

	section h2 {
		font-size: clamp(1.6rem, 2.6vw, 2.7rem);
		line-height: 1;
		letter-spacing: -0.045em;
	}

	section > p:last-child,
	section > p:nth-last-child(2) {
		grid-column: 3;
		color: var(--muted);
	}

	.section-index {
		color: var(--voice);
		font-family: var(--mono);
		font-size: 0.65rem;
		text-transform: uppercase;
	}

	.privacy-back {
		display: inline-block;
		margin-top: 4rem;
		color: var(--voice);
	}

	@media (max-width: 760px) {
		section {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		section > p:last-child,
		section > p:nth-last-child(2) {
			grid-column: auto;
		}
	}
</style>
