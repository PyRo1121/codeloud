/**
 * Product-interest measurement types for the family Web site.
 *
 * The product catalog itself (ProductId, ProductDefinition, PRODUCTS,
 * productFor) lives in `@codeloud/family`, shared across the family surfaces.
 * This module owns only the Web-specific interest-selection vocabulary used by
 * the public signup form.
 */

/** Valid product interest choices captured by the public family page. */
export const INTEREST_SELECTIONS = ["voice", "relay", "both"] as const;

/** A product interest choice captured by the public family page. */
export type InterestSelection = (typeof INTEREST_SELECTIONS)[number];
