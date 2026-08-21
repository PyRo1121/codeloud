/**
 * Browser inspection for the deployed CodeLoud family site.
 *
 * Usage:
 *   node scripts/browser-inspect.mjs
 *   CODELOUD_SITE_URL=http://127.0.0.1:4174 node scripts/browser-inspect.mjs
 */

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const CHROMIUM_PATH = "/usr/bin/chromium";
const SITE_URL = process.env.CODELOUD_SITE_URL ?? "https://codeloud.xyz";
const SCREENSHOT_DIR = resolve("scripts", "screenshots");

function isTurnstileNoise(text) {
	return text.includes("challenges.cloudflare.com") || text.startsWith("%c");
}

const results = { passed: 0, failed: 0, errors: [] };

function report(message) {
	process.stdout.write(`${message}\n`);
}

function reportError(message) {
	process.stderr.write(`${message}\n`);
}

function pass(label) {
	results.passed++;
	report(`  ✓ ${label}`);
}

function fail(label, detail) {
	results.failed++;
	results.errors.push({ label, detail });
	reportError(`  ✗ ${label}: ${detail}`);
}

async function takeScreenshot(page, name) {
	try {
		await page.screenshot({ path: resolve(SCREENSHOT_DIR, `${name}.png`), fullPage: true });
	} catch {
		// Screenshots are diagnostic aids, not a test requirement.
	}
}

async function inspectLayout(page, label) {
	for (const path of ["/", "/voice", "/relay", "/privacy", "/early-access", "/signal"]) {
		const response = await page.goto(`${SITE_URL}${path}`, { waitUntil: "domcontentloaded" });
		const layout = await page.evaluate(() => ({
			hasHeading: Boolean(document.querySelector("h1")),
			overflow: document.documentElement.scrollWidth - window.innerWidth,
		}));
		if (response?.ok() && layout.hasHeading && layout.overflow <= 1) {
			pass(`${label} ${path} renders without horizontal overflow`);
		} else {
			fail(`${label} ${path}`, JSON.stringify(layout));
		}
	}
}

const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
try {
	report("\nHomepage (1280×800):");
	const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	const consoleErrors = [];
	desktop.on("console", (message) => {
		const source = message.location().url;
		if (
			message.type() === "error" &&
			!isTurnstileNoise(message.text()) &&
			!isTurnstileNoise(source)
		) {
			consoleErrors.push(message.text());
		}
	});
	await desktop.goto(SITE_URL, { waitUntil: "domcontentloaded" });

	const desktopTitle = await desktop.title();
	if (desktopTitle.includes("Stop Correcting")) pass("Page title states the customer outcome");
	else fail("Page title", desktopTitle);

	const heading = await desktop.locator("h1").textContent();
	if (heading?.includes("Say what you mean. Make your agent show its work."))
		pass("Hero states the central promise");
	else fail("Hero promise", heading ?? "missing");

	const primaryCta = desktop.locator(".hero .primary-action");
	const ctaBox = await primaryCta.boundingBox();
	if (ctaBox && ctaBox.y + ctaBox.height <= 800) pass("Primary CTA is visible above the fold");
	else fail("Primary CTA", `box=${JSON.stringify(ctaBox)}`);

	const familyMap = desktop.locator(".family-map");
	if ((await familyMap.count()) === 1) pass("Product family map rendered");
	else fail("Product family map", "Expected one .family-map");

	const familyText = await familyMap.textContent();
	if (familyText?.includes("Voice") && familyText.includes("Relay")) {
		pass("Voice and Relay remain visible together");
	} else {
		fail("Product family map", familyText ?? "missing");
	}

	if ((await desktop.locator("article.product").count()) === 2)
		pass("Voice and Relay are both explained");
	else fail("Product explanations", "Expected two product articles");

	if ((await desktop.locator(".cf-turnstile").count()) === 0) {
		pass("Sales homepage contains no form or Turnstile interruption");
	} else {
		fail("Homepage forms", "Turnstile should live on dedicated routes");
	}

	const desktopHeight = await desktop.evaluate(() => document.documentElement.scrollHeight);
	if (desktopHeight < 3200) pass(`Homepage remains compact (${desktopHeight}px)`);
	else fail("Homepage length", `${desktopHeight}px`);

	if (consoleErrors.length === 0) pass("No application console errors");
	else fail("Console errors", consoleErrors.join("; "));
	await takeScreenshot(desktop, "desktop-full");
	await desktop.close();

	report("\nResponsive routes:");
	const mobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
	await inspectLayout(mobile, "Mobile");
	await mobile.goto(SITE_URL, { waitUntil: "domcontentloaded" });
	if (!(await mobile.locator("header.site-header nav").isVisible()))
		pass("Primary nav condenses on mobile");
	else fail("Mobile navigation", "Desktop navigation remains visible");
	const mobileHeight = await mobile.evaluate(() => document.documentElement.scrollHeight);
	if (mobileHeight < 5200) pass(`Mobile homepage remains bounded (${mobileHeight}px)`);
	else fail("Mobile homepage length", `${mobileHeight}px`);
	await takeScreenshot(mobile, "mobile-full");
	await mobile.close();

	report("\nKeyboard navigation:");
	const keyboard = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	await keyboard.goto(SITE_URL, { waitUntil: "domcontentloaded" });
	await keyboard.keyboard.press("Tab");
	const focused = await keyboard.evaluate(() => document.activeElement?.tagName ?? "");
	if (focused === "A") pass("First navigation target is keyboard reachable");
	else fail("Keyboard navigation", `Expected A, got ${focused}`);
	await keyboard.close();

	report("\nDedicated early-access route:");
	const formPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	await formPage.goto(`${SITE_URL}/early-access?product=voice`, { waitUntil: "domcontentloaded" });
	const contactWidget = formPage.locator(".cf-turnstile[data-action='codeloud_interest']");
	if ((await contactWidget.count()) === 1) pass("Contact Turnstile action is isolated");
	else fail("Contact Turnstile", `Expected one, got ${await contactWidget.count()}`);
	if ((await formPage.locator("input[name='product']").inputValue()) === "voice") {
		pass("Product query preselects Voice");
	} else {
		fail("Product preselection", "Voice was not selected");
	}
	await formPage.locator("input[name='email']").fill("browser-inspect@example.com");
	await formPage
		.locator("textarea[name='workflow']")
		.fill("Automated early-access form inspection.");
	await formPage.locator("input[name='privacyConsent']").check();
	await formPage.locator("button.submit").click();
	await formPage.waitForTimeout(2500);
	const successVisible = await formPage
		.locator(".result-success")
		.isVisible()
		.catch(() => false);
	const errorVisible = await formPage
		.locator(".result-error")
		.isVisible()
		.catch(() => false);
	if (successVisible || errorVisible) pass("Contact submission returns a visible result");
	else fail("Contact submission", "No visible success or failure result");

	if (successVisible && SITE_URL === "https://codeloud.xyz") {
		try {
			execSync(
				`npx wrangler d1 execute codeloud-family-interest --remote --command "DELETE FROM codeloud_product_interest WHERE email_normalized='browser-inspect@example.com'"`,
				{ cwd: resolve("."), stdio: "pipe" },
			);
			pass("Production browser-test row removed");
		} catch {
			fail("Test cleanup", "Could not remove the browser-test row");
		}
	}
	await takeScreenshot(formPage, "early-access");
	await formPage.close();

	report("\nDedicated roadmap-signal route:");
	const signalPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	await signalPage.goto(`${SITE_URL}/signal`, { waitUntil: "domcontentloaded" });
	const signalWidget = signalPage.locator(".cf-turnstile[data-action='codeloud_signal']");
	if ((await signalWidget.count()) === 1) pass("Signal Turnstile action is isolated");
	else fail("Signal Turnstile", `Expected one, got ${await signalWidget.count()}`);
	if ((await signalPage.locator("input[name='problem']").count()) === 5) {
		pass("Five bounded roadmap problems rendered");
	} else {
		fail("Roadmap problems", "Expected five choices");
	}
	if ((await signalPage.locator("input[name='trialIntent']").count()) === 3) {
		pass("Three bounded trial-intent choices rendered");
	} else {
		fail("Trial intent", "Expected three choices");
	}
	await takeScreenshot(signalPage, "signal");
	await signalPage.close();
} finally {
	await browser.close();
}

report(`\n${results.passed} passed, ${results.failed} failed.`);
if (results.failed > 0) {
	for (const error of results.errors) reportError(`- ${error.label}: ${error.detail}`);
	process.exitCode = 1;
}
