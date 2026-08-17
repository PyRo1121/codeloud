# CodeLoud family monorepo

CodeLoud is a product family: **Voice** (developer dictation), **Relay** (MCP
technical context), and the **Web** family site, with a **Shared** domain
model. This repository is the single control surface for all three.

## Layout

```
Codeloud/
├── package.json      # Root scripts: build/test/typecheck/deploy across the family
├── Shared/           # @codeloud/family — product catalog + domain types (npm workspace)
├── Web/              # codeloud-family-site — SvelteKit site at codeloud.xyz
├── Voice/            # CodeLoud Voice — desktop/vscode/web/mcp apps (independent git repo)
└── Relay/            # @relay-dev/mcp — Relay MCP server + Cloudflare service (independent git repo)
```

`Web` and `Shared` are npm workspaces managed from this root (`npm install`
here installs both). `Voice` and `Relay` are independent repositories with
their own histories, CI, lockfiles, and nested workspace layouts — the root
delegates to them with `npm --prefix` and never hoists their dependencies.

## Wiring

- **Web** (codeloud.xyz) — SvelteKit site, deployed as the `codeloud-family-site`
  Cloudflare Worker with a D1 interest table and Turnstile protection.
- **Relay** (relay.codeloud.xyz) — MCP server for exact-version technical
  context; also hosts the Relay beta application endpoint the Web site links to.
- **Voice** — desktop (Electron), VS Code, and web apps plus a Voice MCP app;
  consumes external speech providers.

See each project's own docs for detail:
`Web/docs/ARCHITECTURE.md`, `Voice/docs/`, `Relay/docs/`.

## Commands (run from this root)

| Task | Command |
|---|---|
| Install (Web + Shared) | `npm install` |
| Typecheck all | `npm run typecheck` |
| Build all | `npm run build` |
| Test all | `npm run test` |
| Web dev server | `npm run dev:web` |
| Web deploy (codeloud.xyz) | `npm run deploy:web` |
| Web browser inspection | `npm run inspect:web` |
| Voice typecheck / build / unit tests | `npm run typecheck:voice` / `build:voice` / `test:voice:unit` |
| Relay typecheck / build / tests | `npm run typecheck:relay` / `build:relay` / `test:relay` |

## Shared package

`Shared` ships `@codeloud/family`: the product catalog (`ProductId`,
`ProductDefinition`, `PRODUCTS`, `productFor`). Web imports it as a built
package (`dist/`); build it with `npm run build:shared` (Web's root build
scripts do this automatically).

## Git layout

The root is a git repository that tracks `Web`, `Shared`, and the family
config. `Voice/` and `Relay/` are gitignored because they are independently
versioned repositories.
