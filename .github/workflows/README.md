# GitHub Actions Workflows

This directory contains automated workflows for the SFB 1252 Research Data & Methods Workshop Series site (MkDocs, deployed to GitHub Pages).

## Active Workflows

### `deploy.yml` — Build & Deploy
**Triggers:** Push to `main` (full deploy), pull requests to `main` (test build only)

- Renders Quarto presentations (`slides.qmd` → `slides.html`) before the MkDocs build
- Sets up R and installs the packages listed in `docs/workshops/30-data-visualization-ggplot2/DESCRIPTION` (Workshop 30 uses live R chunks)
- Builds the MkDocs site and deploys to GitHub Pages (main branch only)
- PR builds run the same steps without deploying, to catch regressions early

### `quality-check.yml` — Continuous Quality Assurance
**Triggers:** Push to `main`/`develop`, pull requests to `main`

- Markdown linting (markdownlint-cli2)
- Code formatting check (Prettier)
- MkDocs build validation
- HTML output validation (html-validate)
- Accessibility audit (axe-core)
- Workshop content metrics (file counts)

### `weekly-link-check.yml` — Link Validation
**Triggers:** Weekly (Mondays at 2 AM UTC), push to `main` touching docs or the config, manual dispatch

- Runs [lychee](https://github.com/lycheeverse/lychee) against all Markdown using `.lychee.toml`
- Generates a job summary with results; `link-summary` reports the actual job result
- Fails on broken links, with retries and timeouts to absorb transient network errors

## Configuration Files

- **`.lychee.toml`** (repo root) — timeouts, retries, accepted status codes, and ignore patterns (social media, mailto, generated files, etc.)

## 📦 Action Versions & Maintenance Notes

| Action | Version | Notes |
|---|---|---|
| `actions/checkout` | `@v6` | Latest as of May 2026 |
| `actions/setup-python` | `@v6` | Latest as of May 2026 |
| `actions/setup-node` | `@v6` | Latest as of May 2026 (v6.4.0) |
| `actions/cache` | `@v5` | v5 runs on Node.js 24 runtime |
| `quarto-dev/quarto-actions/setup` | `@v2` | Internally pins `actions/cache` at a SHA that uses Node.js 20 |
| `r-lib/actions/setup-r` | `@v2` | R toolchain for the Workshop 30 slides |
| `r-lib/actions/setup-r-dependencies` | `@v2` | Installs the DESCRIPTION dependencies with caching |
| `lycheeverse/lychee-action` | `@v2` | Link checker (static binary; no Node/Chrome setup) |

### Node.js deprecation warning
`quarto-dev/quarto-actions/setup@v2` internally uses a SHA-pinned `actions/cache` that still runs on Node.js 20. This is not directly upgradeable. Both jobs in `deploy.yml` set:

```yaml
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

This opts the job into Node.js 24 and silences the deprecation warning. Remove once `quarto-dev/quarto-actions` ships a version with an updated internal dependency.

### Generated file links (lychee)
Quarto-rendered `slides.html` files are gitignored (built by CI). The pattern `slides\.html$` is excluded in `.lychee.toml` to prevent false-positive 404 errors during link checks.

