/**
 * CodeLoud product family domain model.
 *
 * This is the single source of truth for the public product catalog — the
 * identity, names, and status of each CodeLoud surface — shared by the family
 * Web site, the Voice apps, and the Relay MCP service. Copy-level claims live
 * here; runtime capability discovery does not.
 */
/** The public CodeLoud products. */
export type ProductId = "voice" | "relay";
/** Product metadata used across the family surfaces. */
export interface ProductDefinition {
    readonly id: ProductId;
    readonly name: string;
    readonly status: string;
    readonly descriptor: string;
    readonly promise: string;
    readonly accent: "voice" | "relay";
}
/** The public product definitions. These are copy-level claims, not runtime capability discovery. */
export declare const PRODUCTS: readonly ProductDefinition[];
/** Resolve one product definition; missing definitions are a development defect. */
export declare function productFor(id: ProductId): ProductDefinition;
