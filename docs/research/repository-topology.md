# Repository topology decision

**Status:** accepted
**Date:** 2026-08-20
**Decision:** maintain CodeLoud as an umbrella integration repository with
pinned Voice and Relay Git submodules; keep product build and release authority
inside each product repository.

## Question

Should CodeLoud become one Git/package monorepo, remain an unpinned local
collection of repositories, or become a reproducible umbrella repository?

## Local evidence

Before this change:

- the root Git repository tracked Web and a small Shared package;
- Voice and Relay were ignored nested Git repositories;
- root scripts and CI invoked Voice and Relay even though a clean root checkout
  did not contain either directory;
- clean root typechecking failed at the first missing product package;
- the Shared package exported ignored build output and clean Web checking failed
  until Shared had been built;
- only Web imported the Shared package;
- Voice and Relay already had independent histories, lockfiles, release flows,
  and substantially stronger product-specific CI.

These facts make a full history/package merger high-cost without a current
cross-product compile-time contract. Leaving the repositories unpinned is also
not acceptable because local and CI results depend on arbitrary neighboring
checkouts.

## Primary-source findings

1. Git defines a submodule as a repository with its own history embedded in a
   superproject. The superproject's gitlink stores the object name of the exact
   commit expected for the submodule working tree. Git explicitly identifies
   independently developed projects fixed to chosen versions as a submodule
   use case. [Git `gitsubmodules` documentation](https://git-scm.com/docs/gitsubmodules)
2. `git clone --recurse-submodules` initializes and updates submodules,
   including nested submodules. The equivalent post-clone operation is
   `git submodule update --init --recursive`.
   [Pro Git: Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
3. npm documents `npm ci` as a frozen installation: when `package.json` and the
   lockfile disagree it exits rather than updating the lock, and it does not
   write package manifests or lockfiles.
   [npm `ci` documentation](https://docs.npmjs.com/cli/commands/npm-ci/)
4. SvelteKit automatically exposes files under `src/lib` through the `$lib`
   alias. A Web-only product catalog therefore has a first-class local home and
   does not need a package boundary.
   [SvelteKit `$lib` documentation](https://svelte.dev/docs/kit/$lib)
5. GitHub recommends pinning Actions to full-length commit SHAs because a full
   SHA is the immutable action reference; tags can move or be deleted.
   [GitHub Actions secure-use reference](https://docs.github.com/en/actions/reference/security/secure-use)
6. npm 12 blocks dependency lifecycle scripts unless they are covered by the
   root package's `allowScripts` policy; npm recommends maintaining that policy
   through `npm install-scripts`.
   [npm `install-scripts` documentation](https://docs.npmjs.com/cli/v11/commands/npm-install-scripts/)
7. Dependabot supports both npm dependency updates and full-SHA GitHub Actions
   updates, allowing immutable workflow pins to remain maintainable through
   reviewed pull requests.
   [GitHub Dependabot options reference](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference)

## Options considered

### A. One Git and package monorepo

Import Voice and Relay histories into the root and coordinate all products from
one repository. This enables atomic cross-product commits but couples mature,
independently released products and requires a significant CI, permissions,
and release migration. There is no current shared runtime package that earns
that cost.

### B. Unpinned local umbrella

Keep ignoring Voice and Relay and delegate to whatever directories happen to
exist locally. This is simple but not reproducible: clean clones cannot run the
commands, root CI cannot see the products, and root Git status cannot represent
the integrated state. Rejected.

### C. Pinned umbrella with Git submodules

Keep product ownership independent while recording exact product commits in the
family repository. Root CI verifies root-owned Web code; product CI remains
authoritative. This solves clean-checkout reproducibility without inventing a
custom repository manifest or forcing a release merger. Selected.

## Consequences

- A full family checkout requires authenticated submodule initialization because
  Voice and Relay are private.
- Cross-product changes are coordinated commits, not atomic source commits: land
  and verify the product commit first, then update the family gitlink.
- Root CI does not duplicate full product CI and does not require cross-repository
  credentials for ordinary Web changes.
- A future real cross-product package or frequent atomic change requirement is
  the trigger to reconsider a true monorepo.
- Web keeps one authoritative root npm lockfile. A nested Web lockfile would
  create a second, divergent installation authority and is not retained.

## Confidence and uncertainty

**Confidence: high** for the current repository state. The decision should be
revisited if product ownership, release cadence, repository visibility, or
cross-product contracts materially change.
