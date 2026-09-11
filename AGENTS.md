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

## Conventions

- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `ci:`, `style:`, ...).
- Keep `main` clean; do exploratory/experimental work on `dev`.
- Never commit build artifacts: `dist/`, `.astro/`, and `node_modules/` are gitignored.
