import type { D1Database } from "@cloudflare/workers-types";

type CodeLoudInterestEnvironment = {
	readonly CODELOUD_INTEREST_DB?: D1Database;
	readonly TURNSTILE_SITE_KEY?: string;
	readonly TURNSTILE_SECRET?: string;
	readonly CODELOUD_INTEREST_HOSTNAMES?: string;
};

declare global {
	namespace App {
		interface Platform {
			env: CodeLoudInterestEnvironment;
		}
		interface PageData {
			readonly turnstileSiteKey: string | null;
		}
	}
}
