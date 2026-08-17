import { Effect } from "effect";
import type { Effect as EffectType } from "effect/Effect";
import { Schema } from "@effect/schema";
import type { InterestSelection } from "$lib/domain/products";

/** Normalized, canonical contact address produced only at the boundary. */
export const EmailAddress = Schema.String.pipe(
	Schema.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/u),
	Schema.maxLength(254),
	Schema.brand("EmailAddress"),
);
export type EmailAddress = (typeof EmailAddress)["Type"];

const optionalText = (maximum: number) =>
	Schema.optionalWith(Schema.String.pipe(Schema.maxLength(maximum)), { exact: true });

const productInterestFormSchema = Schema.Struct({
	product: Schema.Literal("voice", "relay", "both"),
	email: EmailAddress,
	name: optionalText(120),
	workflow: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(500)),
	operatingSystem: optionalText(80),
	editor: optionalText(120),
	codingClient: optionalText(120),
	privateSourceNeeded: Schema.optionalWith(Schema.Literal("true", "false"), { exact: true }),
	privacyConsent: Schema.Literal("true"),
	// Honeypot: a human never fills this hidden field, so any non-empty value
	// makes the schema decode fail below and the submission is rejected.
	website: Schema.optionalWith(Schema.Literal(""), { exact: true }),
});

type ProductInterestFormParsed = (typeof productInterestFormSchema)["Type"];

/** Parsed public-family interest input with branded email. */
export interface ProductInterestInput {
	readonly product: InterestSelection;
	readonly email: EmailAddress;
	readonly name?: string;
	readonly workflow: string;
	readonly operatingSystem?: string;
	readonly editor?: string;
	readonly codingClient?: string;
	readonly privateSourceNeeded?: boolean;
}

/** Expected form rejection surfaced to the browser. */
export class InterestFormError extends Schema.TaggedError<InterestFormError>()(
	"InterestFormError",
	{ message: Schema.String },
) {}

const FORM_FIELD_NAMES = [
	"product",
	"email",
	"name",
	"workflow",
	"operatingSystem",
	"editor",
	"codingClient",
	"privateSourceNeeded",
	"privacyConsent",
	"website",
] as const;

/** One declared public-family form field. */
type InterestFormField = (typeof FORM_FIELD_NAMES)[number];

/** Normalized, untrusted boundary record keyed by declared field name. */
type InterestFormRecord = { readonly [K in InterestFormField]?: string };

/**
 * Build the untrusted boundary record before schema decoding.
 *
 * Free-text fields are normalized here (surrounding whitespace trimmed, email
 * lowercased) and any value that is empty after trimming is dropped so
 * `optionalWith(..., { exact: true })` treats it as absent. The schema layer
 * then validates shape (length, literals, email pattern) without needing
 * transform semantics, and a filled honeypot stays a non-empty string so the
 * literal decode rejects it. File values are rejected by the boundary because
 * the public form never sends files.
 */
function formRecord(formData: FormData): InterestFormRecord {
	const entries: Partial<Record<InterestFormField, string>> = {};
	for (const name of FORM_FIELD_NAMES) {
		const value = formData.get(name);
		if (value === null || value instanceof File) continue;
		const normalized = value.trim();
		if (normalized === "") continue;
		entries[name] = name === "email" ? normalized.toLowerCase() : normalized;
	}
	return entries;
}

/** Mutable builder shape; the returned value is exposed as `ProductInterestInput`. */
type InterestInputBuilder = {
	readonly product: InterestSelection;
	readonly email: EmailAddress;
	readonly workflow: string;
	name?: string;
	operatingSystem?: string;
	editor?: string;
	codingClient?: string;
	privateSourceNeeded?: boolean;
};

function toDomainInput(parsed: ProductInterestFormParsed): ProductInterestInput {
	const result: InterestInputBuilder = {
		product: parsed.product,
		email: parsed.email,
		workflow: parsed.workflow,
	};
	// Optional fields are added only when present so the domain input never
	// carries empty strings the browser sent for an unfilled control.
	if (parsed.name !== undefined) result.name = parsed.name;
	if (parsed.operatingSystem !== undefined) result.operatingSystem = parsed.operatingSystem;
	if (parsed.editor !== undefined) result.editor = parsed.editor;
	if (parsed.codingClient !== undefined) result.codingClient = parsed.codingClient;
	if (parsed.privateSourceNeeded !== undefined) {
		result.privateSourceNeeded = parsed.privateSourceNeeded === "true";
	}
	return result;
}

/**
 * Parse untrusted interest form data into a product-specific domain input.
 *
 * The boundary is the schema decode: any field that is not a string with the
 * declared shape, a filled honeypot, or a missing privacy consent becomes an
 * `InterestFormError`.
 */
export const parseProductInterestFormData = (
	formData: FormData,
): EffectType<ProductInterestInput, InterestFormError, never> =>
	Effect.gen(function* () {
		const parsed = yield* Schema.decodeUnknown(productInterestFormSchema)(formRecord(formData));
		return toDomainInput(parsed);
	}).pipe(
		Effect.mapError(
			() =>
				new InterestFormError({
					message: "Check the required fields and privacy consent.",
				}),
		),
	);
