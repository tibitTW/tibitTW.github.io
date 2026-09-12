# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## Project

- Repository: `tibitTW.github.io` — a personal site built with [Astro](https://astro.build).
- Published site: <https://tibittw.github.io>
- Package manager: **npm** (commit `package-lock.json`; use `npm ci`).
- Node version: **22.12.0** (see `.nvmrc`).

## Branches

| Branch     | Purpose                                                                                     |
| :--------- | :------------------------------------------------------------------------------------------ |
| `main`     | **Deploy branch / production.** Pushing to `main` triggers the deploy workflow.             |
| `dev`      | **Active development.** Do daily work here; rebase/merge onto `main` when ready to publish. |
| `gh-pages` | **Generated build output.** Auto-published by CI. Never edit or commit here by hand.        |

### Deploy flow

```
dev --(rebase/merge)--> main --(.github/workflows/deploy.yml)--> builds ./dist --> gh-pages --> https://tibittw.github.io
```

- `.github/workflows/deploy.yml` runs on every push to `main` (and on manual `workflow_dispatch`).
- It runs `npm ci` + `npm run build` and pushes `./dist` to the `gh-pages` branch via `peaceiris/actions-gh-pages`.
- **Do not push to `main` unless you intend to deploy.** Deployment is not instant: wait for the
  workflow to finish, then the site updates.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm ci`          | Install dependencies from the lockfile       |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Type-check (`astro check`) + build to `dist` |
| `npm run preview` | Preview the production build locally         |

## Formatting

- Formatter: **Prettier** (`npx prettier --write .`).
- Formatting-only commits are listed in `.git-blame-ignore-revs`.
- `git blame` is configured to skip them via:

  ```sh
  git config blame.ignoreRevsFile .git-blame-ignore-revs
  ```

  See <https://gist.github.com/kateinoigakukun/b0bc920e587851bfffa98b9e279175f2>.

- Keep formatting-only changes in their own commit and add its hash to `.git-blame-ignore-revs`.
  Do not mix formatting with functional changes in the same commit.
- A **pre-commit hook** (Husky + lint-staged) automatically runs Prettier on staged files,
  so files are formatted before each commit. Run `npm install` once to enable it
  (the `prepare` script installs the hook).

## Styling — use Tailwind CSS

- Styling is done with **Tailwind CSS v4**, integrated via the `@tailwindcss/vite` plugin in
  `astro.config.mjs`. **For any new markup, use Tailwind utility classes** instead of writing new
  `<style>` blocks, separate `.css` files, or inline `style` attributes.
- The global stylesheet is `src/styles/global.css` (just `@import "tailwindcss";`) and is imported
  once in `src/layouts/Layout.astro`. Import it in any new layout the same way.
- Tailwind v4 is configured **in CSS, not in JS**:
  - Add design tokens with a `@theme { ... }` block in `src/styles/global.css`
    (e.g. `--color-brand-500: oklch(...)`) and then use them as utilities (`bg-brand-500`).
  - Do **not** create a `tailwind.config.js` — it is not used by v4.
  - Do **not** add the deprecated `@astrojs/tailwind` integration.
- Prefer utilities over custom CSS. Reach for a `@utility` / `@layer components` rule in
  `global.css` only for genuinely reusable, complex patterns.
- Existing hand-written scoped styles (`src/pages/index.astro`, `src/components/Card.astro`,
  `src/layouts/Layout.astro`) are legacy from the Astro starter. Migrate them to Tailwind
  utilities opportunistically when you touch those files; do not do a big-bang rewrite.
- `prettier-plugin-tailwindcss` is intentionally **not** installed: v0.8.1 does not work with the
  `astro` parser of `prettier-plugin-astro` v1.0.0, so it silently does nothing. Keep class lists
  readable by hand; revisit when the plugin supports it.

## Conventions

- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `ci:`, `style:`, ...).
- Keep `main` clean; do exploratory/experimental work on `dev`.
- Never commit build artifacts: `dist/`, `.astro/`, and `node_modules/` are gitignored.
