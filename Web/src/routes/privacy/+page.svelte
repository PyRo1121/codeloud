<script lang="ts">
	import { resolve } from "$app/paths";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
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
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content="Privacy Notice | CodeLoud" />
	<meta
		property="og:description"
		content="How CodeLoud handles interest signals, contact information, and verification data."
	/>
	<meta property="og:url" content="https://codeloud.xyz/privacy" />
	<meta property="og:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="CodeLoud Voice and Relay product family overview" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Privacy Notice | CodeLoud" />
	<meta
		name="twitter:description"
		content="How CodeLoud handles interest signals, contact information, and verification data."
	/>
	<meta name="twitter:image" content="https://codeloud.xyz/og-codeloud.png" />
	<meta name="twitter:image:alt" content="CodeLoud Voice and Relay product family overview" />
</svelte:head>

<SiteHeader active="privacy" />

<main class="privacy-page page-shell">
	<header class="privacy-hero">
		<p class="mono-label">CodeLoud / privacy</p>
		<h1>Different signals carry different information.</h1>
		<p>
			CodeLoud separates lightweight demand measurement from requests to be contacted. This notice
			explains what each path retains.
		</p>
	</header>

	<div class="notice-list">
		<section>
			<p class="section-index">01 / No-contact signal</p>
			<h2>Choices become a daily aggregate.</h2>
			<div>
				<p>
					The no-contact form records the selected problem, willingness to try an early build, and
					the calendar day. The database increments a grouped counter. It does not retain an
					individual event row, email address, name, IP address, or user agent for this signal.
				</p>
				<p>
					Because no persistent voter identifier is kept, these counts represent verified
					submissions, not guaranteed unique people.
				</p>
			</div>
		</section>

		<section>
			<p class="section-index">02 / Early-access contact</p>
			<h2>Contact information is a separate choice.</h2>
			<div>
				<p>
					The early-access form stores the email address, selected product, workflow description,
					and any optional name, operating-system, editor, coding-client, or private-source
					preference you provide. CodeLoud uses this information to understand demand and contact
					you about access.
				</p>
				<p>
					This table does not store audio, transcripts, source code, credentials, or Relay evidence.
				</p>
			</div>
		</section>

		<section>
			<p class="section-index">03 / Abuse prevention</p>
			<h2>Cloudflare helps deliver and protect the site.</h2>
			<div>
				<p>
					Both forms use Cloudflare Turnstile. A challenge token is validated server-side before a
					write is accepted. The no-contact signal does not send the request IP to Siteverify from
					the application server. Cloudflare may still process ordinary request and security
					metadata as the site, Worker, Turnstile, and D1 provider.
				</p>
			</div>
		</section>

		<section>
			<p class="section-index">04 / Product boundaries</p>
			<h2>Voice and Relay have their own runtime data paths.</h2>
			<div>
				<p>
					Voice currently uses external speech providers whose retention and training-use policies
					vary. Relay owns its authenticated account, API-key, research, and evidence boundaries.
					This public site does not make universal zero-retention claims for those separate
					services.
				</p>
			</div>
		</section>
	</div>

	<a class="privacy-back" href={resolve("/")}>Return to the family overview <span>→</span></a>
</main>

<SiteFooter />

<style>
	.privacy-page {
		padding-block: 6rem 8rem;
	}

	.privacy-hero {
		display: grid;
		grid-template-columns: 0.45fr 1.1fr 0.75fr;
		gap: clamp(2rem, 6vw, 6rem);
		align-items: end;
		padding-bottom: 6rem;
	}

	.privacy-hero .mono-label,
	.section-index {
		margin: 0;
		color: var(--accent);
	}

	h1 {
		max-width: 11ch;
		margin: 0;
		font-size: clamp(3.4rem, 7vw, 7.2rem);
		font-weight: 650;
		line-height: 0.86;
		letter-spacing: -0.075em;
		text-wrap: balance;
	}

	.privacy-hero > p:last-child {
		margin: 0;
		color: var(--muted);
		font-size: 1.05rem;
	}

	.notice-list {
		border-top: 3px solid var(--text);
	}

	section {
		display: grid;
		grid-template-columns: minmax(10rem, 0.45fr) 0.8fr 1fr;
		gap: clamp(2rem, 5vw, 5rem);
		border-bottom: 1px solid var(--line-strong);
		padding-block: 2.5rem;
	}

	.section-index {
		font-family: var(--mono);
		font-size: 0.65rem;
		text-transform: uppercase;
	}

	section h2,
	section p {
		margin: 0;
	}

	section h2 {
		font-size: clamp(1.5rem, 2.5vw, 2.6rem);
		font-weight: 640;
		line-height: 1;
		letter-spacing: -0.045em;
	}

	section div {
		display: grid;
		gap: 1rem;
		color: var(--muted);
	}

	.privacy-back {
		display: inline-block;
		margin-top: 3rem;
		border-bottom: 1px solid var(--text);
		padding-bottom: 0.3rem;
		font-family: var(--mono);
		font-size: 0.68rem;
		text-decoration: none;
	}

	.privacy-back span {
		margin-left: 0.5rem;
		color: var(--accent);
	}

	@media (max-width: 800px) {
		.privacy-hero,
		section {
			grid-template-columns: 1fr;
		}

		.privacy-hero {
			align-items: start;
			padding-bottom: 4.5rem;
		}

		section {
			gap: 1.5rem;
		}
	}
</style>
