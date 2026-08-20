/** Product-interest measurement types for the family Web site. */

/** Valid product interest choices captured by the public family page. */
export const INTEREST_SELECTIONS = ["voice", "relay", "both"] as const;

/** A product interest choice captured by the public family page. */
export type InterestSelection = (typeof INTEREST_SELECTIONS)[number];
