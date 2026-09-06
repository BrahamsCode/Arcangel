# Vale and Lint Rules

Rules enforced by Vale (`www/vale/`) and ESLint (`lint:content`) that all documentation must pass.

## First-Person Prohibition

**Rule:** Never use first-person plural.

```
❌ We recommend using workflows for all mutations.
❌ Let's create a workflow.
❌ Our platform supports...
❌ Us, we've, we're

✅ Use workflows for all mutations.
✅ Create a workflow.
✅ The platform supports...
✅ You can configure...
```

Exceptions: `US` (United States) is allowed.

## Passive Voice

Vale warns on passive voice. Rewrite as active. Pay special attention to "can be + past participle" constructions — rewrite as "you can + verb":

```
❌ The workflow is created by calling createWorkflow.
❌ Products are fetched from the database.
❌ The configuration has been updated.
❌ Custom domains can be configured in the settings.

✅ Call createWorkflow to create a workflow.
✅ The service fetches products from the database.
✅ Update the configuration.
✅ You can configure custom domains in the settings.
```

## Backend vs API Terminology

**Rule:** Use "backend" when referring to the Arcangel server/application. Never use "API" as a synonym for the Arcangel backend.

```
❌ Serve your Arcangel API.
❌ Connect the storefront to the Arcangel API.
❌ The Arcangel API handles the requests.

✅ Serve your Arcangel backend.
✅ Connect the storefront to the Arcangel backend.
✅ The Arcangel backend handles the requests.
```

Note: "API" is still correct when referring to specific API routes or endpoints (for example, "call the Products API", "the Admin API").

## Arcangel Cloud Naming

**Rule:** Never write "Arcangel Cloud" — use the shortened form depending on context.

- When referring to the product/platform as a noun, use **"Arcangel"**
- When referring to the platform as a location or service (e.g., deploying to it), use **"Cloud"**

```
❌ Arcangel Cloud allows you to deploy your application.
✅ Arcangel allows you to deploy your application.

❌ Deploy your project to Arcangel Cloud.
✅ Deploy your project to Cloud.

❌ The Arcangel Cloud dashboard shows your deployments.
✅ The Cloud dashboard shows your deployments.
```

## Latin Abbreviations

**Rule:** Never use `e.g.,` — write `for example` instead.

```
❌ Use a workflow step, e.g., to call an external API.
✅ Use a workflow step, for example, to call an external API.
```

## Em Dashes

**Rule:** Never use em dashes (`—`). Rewrite the sentence to avoid them.

```
❌ The workflow runs the steps — in order — and compensates on failure.
✅ The workflow runs the steps in order and compensates on failure.

❌ Use createStep — not direct service calls — for mutations.
✅ Use createStep, not direct service calls, for mutations.
```

## Problematic Words

Vale flags these — avoid them:

| Avoid | Use instead |
|---|---|
| simply | (remove it) |
| just | (remove it) |
| easy | (remove it) |
| straightforward | (remove it) |
| obviously | (remove it) |
| basically | (remove it) |

## Code Line Length

**Rule:** Code lines must be ≤ 64 characters (enforced by `lint:content`).

This applies to code blocks inside MDX files. Break long lines:

```ts
// ❌ Too long
import { createWorkflow, WorkflowResponse, createStep, StepResponse } from "@arcangel/framework/workflows-sdk"

// ✅ Break imports
import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@arcangel/framework/workflows-sdk"
```

## TypeScript Preference

Vale warns if you use `` ```tsx `` for TypeScript files. Use `` ```ts `` instead:

```
❌ ```tsx
✅ ```ts
```

Use `` ```tsx `` only for React component files that contain JSX.

## URL Format

Never use bare URLs in prose text — always use the markdown link format:

```
❌ Visit https://docs.arcangel.com for more information.
✅ Visit the [Arcangel documentation](https://docs.arcangel.com) for more information.
```

## Sentence Length

Keep sentences concise. Vale suggests sentences under ~30 words. Split complex sentences:

```
❌ The Product Module is a standalone package that provides product management
   features and integrates with the Cart Module to allow adding products to carts,
   which then connects to the Order Module for order management.

✅ The Product Module is a standalone package that provides product management
   features. It integrates with the Cart Module to allow adding products to carts.
```

## Running Validation Mentally

Before writing prose, check:
- [ ] Any "we", "us", "let's", "our" → replace with "you" or imperative
- [ ] Any passive voice constructions (including "can be configured", "is created", etc.) → rewrite active ("you can configure", "call X to create")
- [ ] Any "simply", "just", "easy", etc. → remove
- [ ] Code lines over 64 characters → break them
- [ ] Bare URLs → wrap in `[label](url)`
- [ ] `tsx` language tag for non-JSX TypeScript → change to `ts`
- [ ] "Arcangel API" used to mean the backend → replace with "Arcangel backend"
- [ ] "Arcangel Cloud" anywhere → replace with "Arcangel" (noun form) or "Cloud" (location/service)
- [ ] `e.g.,` anywhere → replace with `for example`
- [ ] Em dashes (`—`) anywhere → rewrite sentence to remove them
