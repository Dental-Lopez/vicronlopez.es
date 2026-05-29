# Vicron Lopez

Premium vehicle **rental** website — a bilingual (EN/ES), SEO-first SvelteKit application with a glassmorphism design system, deployed on Vercel under [vicronlopez.es](https://vicronlopez.es).

## Tech stack

- **Runtime & package manager:** Bun
- **Framework:** SvelteKit (Svelte 5)
- **Styling:** Tailwind CSS v4 (`@theme` tokens, class-based dark mode)
- **Validation:** Zod v4
- **Images:** `@sveltejs/enhanced-img` (responsive AVIF/WebP)
- **Fonts:** self-hosted Inter + Space Grotesk (Fontsource) and a subset Material Symbols icon font
- **Testing:** Vitest (+ coverage) and Playwright (E2E)
- **Quality gates:** Lighthouse CI, Lefthook pre-commit hooks
- **Monitoring:** Sentry
- **Deploy:** `@sveltejs/adapter-vercel`

## Getting started

```sh
bun install        # install dependencies
bun run dev        # start the dev server (http://localhost:5173)
```

> Build-optimized images require `@sveltejs/vite-plugin-svelte` v6+. If you upgrade plugins while a dev server is running, restart it so the new preprocessor is loaded.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the SvelteKit dev server |
| `bun run build` | Production build (prerendered) |
| `bun run preview` | Preview the production build locally |
| `bun run test` | Run Vitest unit/integration tests |
| `bun run test:coverage` | Tests with coverage report |
| `bun run test:e2e` | Run Playwright E2E tests |
| `bun run typecheck` | `svelte-check` type checking |
| `bun run lint` | ESLint |
| `bun run lighthouse` | Build + Lighthouse CI assertions (Performance ≥ 0.90, A11y ≥ 0.95) |
| `bun run icons:subset` | Regenerate the subset Material Symbols icon font |

A `Justfile` mirrors the common recipes (`just dev`, `just build`, `just test`, …).

## Project structure

```text
src/
├── lib/
│   ├── assets/         # imported assets (vehicle images, fonts)
│   ├── components/     # ui/ (design system) + domains/ (feature components)
│   ├── data/           # vehicles.json (catalog source of truth)
│   ├── i18n/           # en/es dictionaries + locale utilities
│   ├── lib/            # data helpers, formatters
│   └── schemas/        # Zod schemas (vehicle, contact, env)
├── routes/[lang=lang]/ # localized pages (home, vehicles, about, contact, legal)
└── hooks.ts            # localized URL rewrites (e.g. /es/vehiculos → /vehicles)
```

## Internationalization

English and Spanish, with fully localized URLs (e.g. `/es/vehiculos/`). Public Spanish paths are transparently rewritten to the technical English routes via `src/hooks.ts`. All user-facing strings live in `src/lib/i18n/{en,es}.ts`.

## Conventions

- **Agent/developer operating manual:** see [`AGENTS.md`](./AGENTS.md) — architecture, TDD workflow, design system, and skill routing.
- **Changelog:** every feature change is recorded in [`CHANGELOG.md`](./CHANGELOG.md) (Keep a Changelog format). This is mandatory per `AGENTS.md`.
- **Commits:** Conventional Commits.
- **Testing:** Test-Driven Development is the default; coverage target ≥ 85%.

## License

Proprietary — © Vicron Lopez. All rights reserved.
