# Contributing

Thank you for considering contributing to Arcangel! This document will outline how to submit changes to this repository and which conventions to follow. If you are ever in doubt about anything we encourage you to reach out either by submitting an issue here or reaching out [via Discord](https://discord.gg/xpCwq3Kfn8).

If you're contributing to our documentation, make sure to also check out the [contribution guidelines on our documentation website](https://docs.arcangel.com/resources/contribution-guidelines/docs).

### Important

Our core maintainers prioritize pull requests (PRs) from within our organization. External contributions are regularly triaged, but not at any fixed cadence. It varies depending on how busy the maintainers are. This is applicable to all types of PRs, so we kindly ask for your patience.

If you, as a community contributor, wish to work on more extensive features, please reach out to CODEOWNERS instead of directly submitting a PR with all the changes. This approach saves us both time, especially if the PR is not accepted (which will be the case if it does not align with our roadmap), and helps us effectively review and evaluate your contribution if it is accepted.

## Prerequisites

- **You're familiar with GitHub Issues and Pull Requests**
- **You've read the [docs](https://docs.arcangel.com).**
- **You've setup a test project with `npx create-arcangel-app@latest`**

## Issues before PRs

1. Before you start working on a change please make sure that there is an issue for what you will be working on. You can either find and [existing issue](https://github.com/arcangel/arcangel/issues) or [open a new issue](https://github.com/arcangel/arcangel/issues/new) if none exists. Doing this makes sure that others can contribute with thoughts or suggest alternatives, ultimately making sure that we only add changes that make

2. When you are ready to start working on a change you should first [fork the Arcangel repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and [branch out](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository) from the `develop` branch.
3. Make your changes.
4. [Open a pull request towards the develop branch in the Arcangel repo](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Within a couple of days a Arcangel team member will review, comment and eventually approve your PR.

## Local development

> Prerequisites:
>
> 1. [Forked Arcangel repository cloned locally](https://github.com/arcangel/arcangel).
> 2. [A local Arcangel application for testing](https://docs.arcangel.com/learn/installation).

The code snippets in this section assume that your forked Arcangel project and the test project are sibling directories, and you optionally setup the starter storefront as part of the installation. For example:

```
|
|__ arcangel  // forked repository
|
|__ test-project // arcangel application for testing
|
|__ test-project_storefront // (optional) storefront to interact with arcangel application
```

1. Replace the @arcangel/\* dependencies and devDependencies in you test project's `package.json` to point to the corresponding local packages in your forked Arcangel repository. You will also need to add the arcangel packages in the resolutions section of the `package.json`, so that every dependency is resolved locally. For example, assuming your forked Arcangel project and the test project are sibling directories:

```json
// test project package.json (for npm/yarn)
"dependencies": {
    // more deps
    "@arcangel/admin-sdk": "file:../arcangel/packages/admin/admin-sdk",
    "@arcangel/cli": "file:../arcangel/packages/cli/arcangel-cli",
    "@arcangel/framework": "file:../arcangel/packages/core/framework",
    "@arcangel/arcangel": "file:../arcangel/packages/arcangel",
},
"devDependencies": {
    // more dev deps
    "@arcangel/test-utils": "file:../arcangel/packages/arcangel-test-utils",
},
"resolutions": {
    // more resolutions
    "@arcangel/test-utils": "file:../arcangel/packages/arcangel-test-utils",
    "@arcangel/api-key": "file:../arcangel/packages/modules/api-key",
    "@arcangel/auth": "file:../arcangel/packages/modules/auth",
    "@arcangel/cache-inmemory": "file:../arcangel/packages/modules/cache-inmemory",
    "@arcangel/cache-redis": "file:../arcangel/packages/modules/cache-redis",
    "@arcangel/cart": "file:../arcangel/packages/modules/cart",
    "@arcangel/locking": "file:../arcangel/packages/modules/locking",
    "@arcangel/currency": "file:../arcangel/packages/modules/currency",
    "@arcangel/customer": "file:../arcangel/packages/modules/customer",
    "@arcangel/event-bus-local": "file:../arcangel/packages/modules/event-bus-local",
    "@arcangel/file": "file:../arcangel/packages/modules/file",
    "@arcangel/file-local": "file:../arcangel/packages/modules/providers/file-local",
    "@arcangel/fulfillment": "file:../arcangel/packages/modules/fulfillment",
    "@arcangel/fulfillment-manual": "file:../arcangel/packages/modules/providers/fulfillment-manual",
    "@arcangel/index": "file:../arcangel/packages/modules/index",
    "@arcangel/inventory": "file:../arcangel/packages/modules/inventory",
    "@arcangel/arcangel": "file:../arcangel/packages/arcangel",
    "@arcangel/notification": "file:../arcangel/packages/modules/notification",
    "@arcangel/notification-local": "file:../arcangel/packages/modules/providers/notification-local",
    "@arcangel/order": "file:../arcangel/packages/modules/order",
    "@arcangel/payment": "file:../arcangel/packages/modules/payment",
    "@arcangel/pricing": "file:../arcangel/packages/modules/pricing",
    "@arcangel/product": "file:../arcangel/packages/modules/product",
    "@arcangel/promotion": "file:../arcangel/packages/modules/promotion",
    "@arcangel/rbac": "file:../arcangel/packages/modules/rbac",
    "@arcangel/region": "file:../arcangel/packages/modules/region",
    "@arcangel/sales-channel": "file:../arcangel/packages/modules/sales-channel",
    "@arcangel/stock-location": "file:../arcangel/packages/modules/stock-location",
    "@arcangel/store": "file:../arcangel/packages/modules/store",
    "@arcangel/tax": "file:../arcangel/packages/modules/tax",
    "@arcangel/user": "file:../arcangel/packages/modules/user",
    "@arcangel/workflow-engine-inmemory": "file:../arcangel/packages/modules/workflow-engine-inmemory",
    "@arcangel/link-modules": "file:../arcangel/packages/modules/link-modules",
    "@arcangel/admin-bundler": "file:../arcangel/packages/admin/admin-bundler",
    "@arcangel/admin-sdk": "file:../arcangel/packages/admin/admin-sdk",
    "@arcangel/admin-shared": "file:../arcangel/packages/admin/admin-shared",
    "@arcangel/dashboard": "file:../arcangel/packages/admin/dashboard",
    "@arcangel/admin-vite-plugin": "file:../arcangel/packages/admin/admin-vite-plugin",
    "@arcangel/ui": "file:../arcangel/packages/design-system/ui",
    "@arcangel/icons": "file:../arcangel/packages/design-system/icons",
    "@arcangel/toolbox": "file:../arcangel/packages/design-system/toolbox",
    "@arcangel/ui-preset": "file:../arcangel/packages/design-system/ui-preset",
    "@arcangel/utils": "file:../arcangel/packages/core/utils",
    "@arcangel/types": "file:../arcangel/packages/core/types",
    "@arcangel/core-flows": "file:../arcangel/packages/core/core-flows",
    "@arcangel/orchestration": "file:../arcangel/packages/core/orchestration",
    "@arcangel/cli": "file:../arcangel/packages/cli/arcangel-cli",
    "@arcangel/modules-sdk": "file:../arcangel/packages/core/modules-sdk",
    "@arcangel/workflows-sdk": "file:../arcangel/packages/core/workflows-sdk",
    "@arcangel/js-sdk": "file:../../arcangel/packages/core/js-sdk",
    "@arcangel/framework": "file:../arcangel/packages/core/framework",
    "@arcangel/auth-emailpass": "file:../arcangel/packages/modules/providers/auth-emailpass",
    "@arcangel/locking-redis": "file:../arcangel/packages/modules/providers/locking-redis",
    "@arcangel/locking-postgres": "file:../arcangel/packages/modules/providers/locking-postgres",
    "@arcangel/telemetry": "file:../arcangel/packages/arcangel-telemetry",
    "@arcangel/settings": "file:../arcangel/packages/modules/settings",
    "@arcangel/draft-order": "file:../arcangel/packages/plugins/draft-order",
    "@arcangel/loyalty-plugin": "file:../arcangel/packages/plugins/loyalty",
    "@arcangel/deps": "file:../arcangel/packages/deps",
    "@arcangel/caching-redis": "file:../arcangel/packages/modules/providers/caching-redis",
    "@arcangel/caching": "file:../arcangel/packages/modules/caching",
    "@arcangel/translation": "file:../arcangel/packages/modules/translation",
}
```

If you're using `pnpm`, use `pnpm.overrides` instead of `resolutions`:

```
// .npmrc
shamefully-hoist=true
node-linker=hoisted
```

```json
// test project package.json (for pnpm)
"dependencies": {
    // more deps
    "@arcangel/admin-sdk": "link:../arcangel/packages/admin/admin-sdk",
    "@arcangel/cli": "link:../arcangel/packages/cli/arcangel-cli",
    "@arcangel/framework": "link:../arcangel/packages/core/framework",
    "@arcangel/arcangel": "link:../arcangel/packages/arcangel",
},
"devDependencies": {
    // more dev deps
    "@arcangel/admin-shared": "link:../arcangel/packages/admin/admin-shared",
    "@arcangel/dashboard": "link:../arcangel/packages/admin/dashboard",
    "@arcangel/draft-order": "link:../arcangel/packages/plugins/draft-order",
    "@arcangel/icons": "link:../arcangel/packages/design-system/icons",
    "@arcangel/test-utils": "link:../arcangel/packages/arcangel-test-utils",
    "@arcangel/eslint-plugin": "link:../arcangel/packages/eslint-plugin",
    "@arcangel/types": "link:../arcangel/packages/core/types",
    "@arcangel/ui": "link:../arcangel/packages/design-system/ui",
},
"pnpm": {
  "overrides": {
    // more overrides
      "@arcangel/test-utils": "link:../arcangel/packages/arcangel-test-utils",
      "@arcangel/api-key": "link:../arcangel/packages/modules/api-key",
      "@arcangel/auth": "link:../arcangel/packages/modules/auth",
      "@arcangel/cache-inmemory": "link:../arcangel/packages/modules/cache-inmemory",
      "@arcangel/cache-redis": "link:../arcangel/packages/modules/cache-redis",
      "@arcangel/cart": "link:../arcangel/packages/modules/cart",
      "@arcangel/locking": "link:../arcangel/packages/modules/locking",
      "@arcangel/currency": "link:../arcangel/packages/modules/currency",
      "@arcangel/customer": "link:../arcangel/packages/modules/customer",
      "@arcangel/event-bus-local": "link:../arcangel/packages/modules/event-bus-local",
      "@arcangel/file": "link:../arcangel/packages/modules/file",
      "@arcangel/file-local": "link:../arcangel/packages/modules/providers/file-local",
      "@arcangel/fulfillment": "link:../arcangel/packages/modules/fulfillment",
      "@arcangel/fulfillment-manual": "link:../arcangel/packages/modules/providers/fulfillment-manual",
      "@arcangel/index": "link:../arcangel/packages/modules/index",
      "@arcangel/inventory": "link:../arcangel/packages/modules/inventory",
      "@arcangel/arcangel": "link:../arcangel/packages/arcangel",
      "@arcangel/notification": "link:../arcangel/packages/modules/notification",
      "@arcangel/notification-local": "link:../arcangel/packages/modules/providers/notification-local",
      "@arcangel/order": "link:../arcangel/packages/modules/order",
      "@arcangel/payment": "link:../arcangel/packages/modules/payment",
      "@arcangel/pricing": "link:../arcangel/packages/modules/pricing",
      "@arcangel/product": "link:../arcangel/packages/modules/product",
      "@arcangel/promotion": "link:../arcangel/packages/modules/promotion",
      "@arcangel/rbac": "link:../arcangel/packages/modules/rbac",
      "@arcangel/region": "link:../arcangel/packages/modules/region",
      "@arcangel/sales-channel": "link:../arcangel/packages/modules/sales-channel",
      "@arcangel/stock-location": "link:../arcangel/packages/modules/stock-location",
      "@arcangel/store": "link:../arcangel/packages/modules/store",
      "@arcangel/tax": "link:../arcangel/packages/modules/tax",
      "@arcangel/user": "link:../arcangel/packages/modules/user",
      "@arcangel/workflow-engine-inmemory": "link:../arcangel/packages/modules/workflow-engine-inmemory",
      "@arcangel/link-modules": "link:../arcangel/packages/modules/link-modules",
      "@arcangel/admin-bundler": "link:../arcangel/packages/admin/admin-bundler",
      "@arcangel/admin-sdk": "link:../arcangel/packages/admin/admin-sdk",
      "@arcangel/admin-shared": "link:../arcangel/packages/admin/admin-shared",
      "@arcangel/dashboard": "link:../arcangel/packages/admin/dashboard",
      "@arcangel/admin-vite-plugin": "link:../arcangel/packages/admin/admin-vite-plugin",
      "@arcangel/ui": "link:../arcangel/packages/design-system/ui",
      "@arcangel/icons": "link:../arcangel/packages/design-system/icons",
      "@arcangel/toolbox": "link:../arcangel/packages/design-system/toolbox",
      "@arcangel/ui-preset": "link:../arcangel/packages/design-system/ui-preset",
      "@arcangel/utils": "link:../arcangel/packages/core/utils",
      "@arcangel/types": "link:../arcangel/packages/core/types",
      "@arcangel/core-flows": "link:../arcangel/packages/core/core-flows",
      "@arcangel/orchestration": "link:../arcangel/packages/core/orchestration",
      "@arcangel/cli": "link:../arcangel/packages/cli/arcangel-cli",
      "@arcangel/modules-sdk": "link:../arcangel/packages/core/modules-sdk",
      "@arcangel/workflows-sdk": "link:../arcangel/packages/core/workflows-sdk",
      "@arcangel/js-sdk": "link:../arcangel/packages/core/js-sdk",
      "@arcangel/framework": "link:../arcangel/packages/core/framework",
      "@arcangel/auth-emailpass": "link:../arcangel/packages/modules/providers/auth-emailpass",
      "@arcangel/locking-redis": "link:../arcangel/packages/modules/providers/locking-redis",
      "@arcangel/locking-postgres": "link:../arcangel/packages/modules/providers/locking-postgres",
      "@arcangel/telemetry": "link:../arcangel/packages/arcangel-telemetry",
      "@arcangel/settings": "link:../arcangel/packages/modules/settings",
      "@arcangel/draft-order": "link:../arcangel/packages/plugins/draft-order",
      "@arcangel/deps": "link:../arcangel/packages/deps",
      "@arcangel/caching-redis": "link:../arcangel/packages/modules/providers/caching-redis",
      "@arcangel/caching": "link:../arcangel/packages/modules/caching",
      "@arcangel/translation": "link:../arcangel/packages/modules/translation"
  }
}
```

2. Every time you make a change in the forked Arcangel repository, you need to build the packages where the modifications took place with `yarn build`. Some packages have a watch script, so you can execute `yarn watch` once and it will automatically build on changes:

```bash
yarn build # or yarn watch
```

3. After building changes in the forked arcangel repository, run the following command in the test project to regenerate the `node_modules` directory with the newly built contents from the previous step:

```bash
# For npm/yarn
rm -R node_modules && yarn && yarn dev

# For pnpm
rm -R node_modules && pnpm install && pnpm dev
```

## Workflow

### Branches

There are currently two base branches:

- `develop` - development of Arcangel 2.0
- `v1.x` - development of Arcangel v1.x

Note, if you wish to patch v1.x you should use `v1.x` as the base branch for your pull request. This is not the default when you clone the repository.

All changes should be part of a branch and submitted as a pull request - your branches should be prefixed with one of:

- `fix/` for bug fixes
- `feat/` for features
- `docs/` for documentation changes

### Commits

Strive towards keeping your commits small and isolated - this helps the reviewer understand what is going on and makes it easier to process your requests.

### Pull Requests

**Base branch**

If you wish to patch v1.x your base branch should be `v1.x`.

If your changes should result in a new version of Arcangel, you will need to generate a **changelog**. Follow [this guide](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) on how to generate a changeset.

Finally, submit your branch as a pull request. Your pull request should be opened against the `develop` branch in the main Arcangel repo.

In your PR's description you should follow the structure:

- **What** - what changes are in this PR
- **Why** - why are these changes relevant
- **How** - how have the changes been implemented
- **Testing** - how has the changes been tested or how can the reviewer test the feature

We highly encourage that you do a self-review prior to requesting a review. To do a self review click the review button in the top right corner, go through your code and annotate your changes. This makes it easier for the reviewer to process your PR.

#### Merge Style

All pull requests are squashed and merged.

### Testing

All PRs should include tests for the changes that are included. We have two types of tests that must be written:

- **Unit tests** found under `packages/*/src/services/__tests__` and `packages/*/src/api/routes/*/__tests__`
- **Integration tests** found in `integration-tests/*/__tests__`

### Documentation

- We generally encourage to document your changes through comments in your code.
- If you alter user-facing behaviour you must provide documentation for such changes.
- All methods and endpoints should be documented using [TSDoc](https://tsdoc.org/).

### Release

The Arcangel team will regularly create releases from two release branches:

- `develop` - preview releases of Arcangel 2.0
- `v1.x` - official releases of Arcangel 1.x
