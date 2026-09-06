# @arcangel/eslint-plugin

Official ESLint plugin for Arcangel projects. Codifies Arcangel's framework conventions into automatically-enforced static checks across API routes, modules, workflows, subscribers, scheduled jobs, admin extensions, and module links.

> Status: pre-release. The plugin currently ships with no rules — only the package scaffold and `recommended` / `strict` config shapes. Rules will land incrementally; see `ARCANGEL_LINT_RULES_CATALOG.md` at the repo root for the planned set.

## Installation

```bash
npm install -D @arcangel/eslint-plugin eslint
```

`eslint` is a peer dependency — install it in the consuming project.

## Usage (flat config)

```js
// eslint.config.js
import arcangel from "@arcangel/eslint-plugin"

export default [...arcangel.configs.recommended]
```

## Configs

- `recommended` — default preset for Arcangel projects.
- `strict` — extends `recommended` and enables stricter, opt-in heuristics.

## Development

```bash
yarn workspace @arcangel/eslint-plugin build
yarn workspace @arcangel/eslint-plugin test
```
