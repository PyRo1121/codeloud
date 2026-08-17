import { describe, expect, it } from "vitest";
import { Effect, Either } from "effect";
import { Schema } from "@effect/schema";
import {
	EmailAddress as EmailAddressSchema,
	type ProductInterestInput,
} from "$lib/domain/interest";
import type { InterestPersistenceError, InterestVerificationError } from "./interest-store";
import {
	admittedInterestClientAddress,
	parseInterestHostnames,
	saveProductInterest,
	type InterestStoreDependencies,
	type InterestSubmissionSecurity,
	type ProductInterestDatabase,
	type ProductInterestStoreResult,
} from "./interest-store";

/** In-memory seam satisfying the narrow database interface the store uses. */
class FakeInterestDatabase implements ProductInterestDatabase {
	readonly queries: string[] = [];
	readonly writes: Array<Array<string | number | null>> = [];
	changes = 0;
	failWrite = false;

	prepare(query: string) {
		this.queries.push(query);
		return this;
	}

	bind(...values: ReadonlyArray<string | number | null>) {
		this.writes.push([...values]);
		return this;
	}

	run(): Promise<{ readonly meta: { readonly changes: number } }> {
		if (this.failWrite) return Promise.reject(new Error("simulated storage failure"));
		return Promise.resolve({ meta: { changes: this.changes } });
	}
}

/** The siteverify response shape the fake endpoint returns. */
type SiteverifyPayload = {
	readonly success: boolean;
	readonly action?: string;
	readonly hostname?: string;
};

/** Fake siteverify endpoint that records the request and returns `payload`. */
function fakeSiteverify(payload: SiteverifyPayload) {
	const calls: Array<{ form: URLSearchParams }> = [];
	const fetchImplementation: typeof fetch = (_input, init) => {
		const body = init?.body;
		const form = body instanceof URLSearchParams ? body : new URLSearchParams();
		calls.push({ form });
		return Promise.resolve(new Response(JSON.stringify(payload), { status: 200 }));
	};
	return { calls, fetchImplementation };
}

function security(overrides: Partial<InterestSubmissionSecurity> = {}): InterestSubmissionSecurity {
	return {
		turnstileToken: "valid-token",
		clientAddress: "203.0.113.7",
		turnstileSecret: "secret",
		allowedHostnames: ["codeloud.xyz"],
		...overrides,
	};
}

function dependencies(
	overrides: Partial<InterestStoreDependencies> = {},
): InterestStoreDependencies {
	return {
		fetch: fakeSiteverify({ success: true, action: "codeloud_interest", hostname: "codeloud.xyz" })
			.fetchImplementation,
		now: () => new Date("2026-08-17T00:00:00.000Z"),
		...overrides,
	};
}

function testInput(): ProductInterestInput {
	return {
		product: "voice",
		email: Schema.decodeUnknownSync(EmailAddressSchema)("dev@example.com"),
		workflow: "Dictate a prompt and check exact package context.",
	};
}

type InterestStoreError = InterestVerificationError | InterestPersistenceError;

async function runSave(
	database: ProductInterestDatabase,
	overrideSecurity: Partial<InterestSubmissionSecurity> = {},
	overrideDeps: Partial<InterestStoreDependencies> = {},
): Promise<Either.Either<ProductInterestStoreResult, InterestStoreError>> {
	return Effect.runPromise(
		Effect.either(
			saveProductInterest(
				database,
				testInput(),
				security(overrideSecurity),
				dependencies(overrideDeps),
			),
		),
	);
}

describe("interest hostname parsing", () => {
	it("parses, lowercases, and deduplicates configured hostnames", () => {
		expect(parseInterestHostnames("codeloud.xyz,  LocalHost ,codeloud.xyz")).toEqual([
			"codeloud.xyz",
			"localhost",
		]);
	});

	it("returns an empty allowlist for invalid input (fail closed)", () => {
		expect(parseInterestHostnames("not a hostname!")).toEqual([]);
		expect(parseInterestHostnames(undefined)).toEqual([]);
	});
});

describe("client address bounding", () => {
	it("bounds and lowercases a plausible address", () => {
		expect(admittedInterestClientAddress("203.0.113.7")).toBe("203.0.113.7");
		expect(admittedInterestClientAddress("2001:DB8::1")).toBe("2001:db8::1");
	});

	it("rejects empty, oversized, or non-address input", () => {
		expect(admittedInterestClientAddress(null)).toBe("unavailable");
		expect(admittedInterestClientAddress("")).toBe("unavailable");
		expect(admittedInterestClientAddress("a".repeat(65))).toBe("unavailable");
		expect(admittedInterestClientAddress("<script>")).toBe("unavailable");
	});
});

describe("saveProductInterest", () => {
	it("persists an interest row after a successful siteverify", async () => {
		const database = new FakeInterestDatabase();
		database.changes = 1;
		const outcome = await runSave(database);

		expect(Either.isRight(outcome)).toBe(true);
		if (Either.isRight(outcome)) {
			expect(outcome.right).toEqual({ status: "created" });
		}
		expect(database.queries[0]).toContain("INSERT OR IGNORE INTO codeloud_product_interest");
		expect(database.writes[0]?.[0]).toBe("dev@example.com");
		expect(database.writes[0]?.[1]).toBe("voice");
	});

	it("reports duplicates from the primary-key guard", async () => {
		const database = new FakeInterestDatabase();
		database.changes = 0;
		const outcome = await runSave(database);

		expect(Either.isRight(outcome)).toBe(true);
		if (Either.isRight(outcome)) {
			expect(outcome.right).toEqual({ status: "duplicate" });
		}
	});

	it("fails verification when the token is oversized", async () => {
		const outcome = await runSave(new FakeInterestDatabase(), {
			turnstileToken: "x".repeat(2_049),
		});
		expect(Either.isLeft(outcome)).toBe(true);
		if (Either.isLeft(outcome)) expect(outcome.left._tag).toBe("InterestVerificationError");
	});

	it("fails verification when the hostname is not in the allowlist", async () => {
		const outcome = await runSave(new FakeInterestDatabase(), {
			allowedHostnames: [],
		});
		expect(Either.isLeft(outcome)).toBe(true);
		if (Either.isLeft(outcome)) expect(outcome.left._tag).toBe("InterestVerificationError");
	});

	it("fails verification when siteverify rejects the token", async () => {
		const { fetchImplementation } = fakeSiteverify({ success: false });
		const outcome = await runSave(new FakeInterestDatabase(), {}, { fetch: fetchImplementation });
		expect(Either.isLeft(outcome)).toBe(true);
		if (Either.isLeft(outcome)) expect(outcome.left._tag).toBe("InterestVerificationError");
	});

	it("fails verification when the echoed action does not match", async () => {
		const { fetchImplementation } = fakeSiteverify({
			success: true,
			action: "different_action",
			hostname: "codeloud.xyz",
		});
		const outcome = await runSave(new FakeInterestDatabase(), {}, { fetch: fetchImplementation });
		expect(Either.isLeft(outcome)).toBe(true);
		if (Either.isLeft(outcome)) expect(outcome.left._tag).toBe("InterestVerificationError");
	});

	it("classifies storage failures as persistence errors", async () => {
		const database = new FakeInterestDatabase();
		database.failWrite = true;
		const outcome = await runSave(database);
		expect(Either.isLeft(outcome)).toBe(true);
		if (Either.isLeft(outcome)) expect(outcome.left._tag).toBe("InterestPersistenceError");
	});
});
