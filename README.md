# CodeLoud family integration repository

CodeLoud is a product family: **Voice** (developer dictation), **Relay** (MCP
technical context), and the **Web** family site. This repository is the pinned
integration and public-site control surface for those independently released
products.

## Repository model

This is an umbrella repository rather than a single-package monorepo:

```text
Codeloud/
├── package.json      # Web commands and explicit product delegates
├── Web/              # Tracked SvelteKit family site at codeloud.xyz
├── Voice/            # Pinned private Git submodule: codeloud-voice
└── Relay/            # Pinned private Git submodule: codeloud-relay
```

Voice and Relay keep their own histories, lockfiles, release processes, and CI.
The root repository records the exact commit expected for each product. Web
owns its product catalog under `Web/src/lib/domain/product-catalog.ts`; there is
no package boundary until another repository has a real consumer contract.

The rationale and supporting primary sources are recorded in
[`docs/research/repository-topology.md`](docs/research/repository-topology.md).

## Clone and initialize

Voice and Relay are private repositories, so Git must already be authenticated
for the `PyRo1121` GitHub account.

```bash
git clone https://github.com/PyRo1121/codeloud.git
cd codeloud
git submodule update --init --recursive
```

A normal clone is sufficient for Web-only work. The submodule command checks
out the exact Voice and Relay commits recorded by this repository.

## Ownership and CI

- Root CI owns Web linting, typechecking, tests, dependency audit, and build.
- Voice CI owns Voice compiler, Python, coverage, packaging, and Electron gates.
- Relay CI owns Relay compiler, coverage, package, evaluation, and conformance gates.
- Root integration commands are explicit and are not duplicated in root CI.

This separation keeps product pipelines authoritative while the Git submodule
pointers provide a reproducible family integration state.

## Commands

Run these from the repository root:

| Task | Command |
| --- | --- |
| Install Web | `npm ci` |
| Verify Web completely | `npm run verify:web` |
| Web dev server | `npm run dev:web` |
| Web deploy | `npm run deploy:web` |
| Web browser inspection | `npm run inspect:web` |
| Relay beta browser check | `npm run check:relay-beta` |
| Typecheck pinned products | `npm run check:products` |
| Voice build / unit tests | `npm run build:voice` / `npm run test:voice:unit` |
| Relay build / tests | `npm run build:relay` / `npm run test:relay` |

Product commands require initialized submodules and dependencies installed in
the relevant product repository:

```bash
npm --prefix Voice ci
npm --prefix Relay ci
```

## Updating a product pointer

Develop, commit, push, and verify a product change in its own repository first.
Then update the family repository to that published commit:

```bash
git -C Relay fetch origin
git -C Relay checkout <verified-relay-commit>
git add Relay
```

Use the same process for Voice. Review the pointer change with
`git diff --submodule=log`. Never point the family repository at a product
commit that has not been pushed to its remote.

## Product wiring

- **Web** (`codeloud.xyz`) is a SvelteKit application deployed as the
  `codeloud-family-site` Cloudflare Worker with D1 interest storage and
  Turnstile protection.
- **Relay** (`relay.codeloud.xyz`) is the authenticated MCP service and owns its
  beta application, account, API-key, evidence, and research boundaries.
- **Voice** owns the desktop, VS Code, web, and MCP application surfaces and
  integrates with external speech providers.

See `Web/docs/ARCHITECTURE.md`, `Voice/docs/`, and `Relay/docs/` for product-level
details.

## Relay MCP connection

The production MCP server is hosted at `https://relay.codeloud.xyz/mcp` and
authenticates with a personal access token created in the Relay account console
at `https://relay.codeloud.xyz/account`.

```json
{
  "mcpServers": {
    "relay": {
      "url": "https://relay.codeloud.xyz/mcp",
      "headers": { "Authorization": "Bearer <relay_pat_…>" }
    }
  }
}
```

Keys carry scoped permissions and can be revoked or rotated from the console.
