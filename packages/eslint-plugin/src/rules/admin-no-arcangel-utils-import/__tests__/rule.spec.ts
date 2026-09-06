import { createRuleTester } from "../../../test-utils"
import { rule } from "../rule"

const ruleTester = createRuleTester()

ruleTester.run("admin-no-arcangel-utils-import", rule, {
  valid: [
    // The admin SDK is the supported, browser-safe entry point.
    { code: `import { defineWidgetConfig } from "@arcangel/admin-sdk"` },
    // Types are erased at build time — safe to import.
    { code: `import type { HttpTypes } from "@arcangel/framework/types"` },
    // The JS SDK is browser-safe.
    { code: `import Arcangel from "@arcangel/js-sdk"` },
    // Unrelated third-party imports.
    { code: `import { useState } from "react"` },
    { code: `import { z } from "zod"` },
    // A subpath whose name merely starts the same way — not an exact match.
    { code: `import x from "@arcangel/framework/utils-extra"` },
  ],
  invalid: [
    {
      code: `import { ArcangelError } from "@arcangel/framework/utils"`,
      errors: [{ messageId: "nodeOnlyImportInAdmin" }],
    },
    {
      code: `import { defineMiddlewares } from "@arcangel/framework/http"`,
      errors: [{ messageId: "nodeOnlyImportInAdmin" }],
    },
    {
      code: `import { createWorkflow } from "@arcangel/framework/workflows-sdk"`,
      errors: [{ messageId: "nodeOnlyImportInAdmin" }],
    },
    // Single quotes are matched too.
    {
      code: `import { Modules } from '@arcangel/framework/utils'`,
      errors: [{ messageId: "nodeOnlyImportInAdmin" }],
    },
    // Side-effect-only import.
    {
      code: `import "@arcangel/framework/utils"`,
      errors: [{ messageId: "nodeOnlyImportInAdmin" }],
    },
    // Re-export of a Node-only module.
    {
      code: `export { ArcangelError } from "@arcangel/framework/utils"`,
      errors: [{ messageId: "nodeOnlyImportInAdmin" }],
    },
    {
      code: `export * from "@arcangel/framework/http"`,
      errors: [{ messageId: "nodeOnlyImportInAdmin" }],
    },
  ],
})
