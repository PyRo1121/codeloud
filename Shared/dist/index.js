/**
 * CodeLoud product family domain model.
 *
 * This is the single source of truth for the public product catalog — the
 * identity, names, and status of each CodeLoud surface — shared by the family
 * Web site, the Voice apps, and the Relay MCP service. Copy-level claims live
 * here; runtime capability discovery does not.
 */
/** The public product definitions. These are copy-level claims, not runtime capability discovery. */
export const PRODUCTS = [
    {
        id: "voice",
        name: "CodeLoud Voice",
        status: "Private development",
        descriptor: "Developer dictation that keeps the terms that matter.",
        promise: "Speech-to-text for prompts, code, commands, and notes with review before insertion.",
        accent: "voice",
    },
    {
        id: "relay",
        name: "CodeLoud Relay",
        status: "Private beta",
        descriptor: "One MCP connection for technical context.",
        promise: "Exact-version documentation, technical research, package review, and evidence in one focused connection.",
        accent: "relay",
    },
];
/** Resolve one product definition; missing definitions are a development defect. */
export function productFor(id) {
    const product = PRODUCTS.find((candidate) => candidate.id === id);
    if (!product)
        throw new Error(`Unknown CodeLoud product: ${id}`);
    return product;
}
