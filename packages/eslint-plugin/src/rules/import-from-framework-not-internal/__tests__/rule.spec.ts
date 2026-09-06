import { createRuleTester } from "../../../test-utils"
import { rule } from "../rule"

const ruleTester = createRuleTester()

ruleTester.run("import-from-framework-not-internal", rule, {
  valid: [
    // Canonical framework entry points.
    { code: `import { ArcangelError } from "@arcangel/framework/utils"` },
    { code: `import type { Context } from "@arcangel/framework/types"` },
    {
      code: `import { createWorkflow } from "@arcangel/framework/workflows-sdk"`,
    },
    { code: `import { defineMiddlewares } from "@arcangel/framework/http"` },
    // Other public packages are fine.
    { code: `import { deleteOrderWorkflow } from "@arcangel/core-flows"` },
    { code: `import { defineWidgetConfig } from "@arcangel/admin-sdk"` },
    // Unrelated third-party import.
    { code: `import { z } from "zod"` },
    // A @arcangel package whose name merely contains "dist" — not a dist deep import.
    { code: `import x from "@arcangel/some-dist-thing"` },
    // Public subpath that isn't dist.
    { code: `import { Modules } from "@arcangel/framework/utils"` },
  ],
  invalid: [
    // Deprecated standalone package → framework subpath (autofix).
    {
      code: `import { ArcangelError } from "@arcangel/utils"`,
      output: `import { ArcangelError } from "@arcangel/framework/utils"`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    {
      code: `import type { Context } from "@arcangel/types"`,
      output: `import type { Context } from "@arcangel/framework/types"`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    {
      code: `import { createWorkflow } from "@arcangel/workflows-sdk"`,
      output: `import { createWorkflow } from "@arcangel/framework/workflows-sdk"`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    {
      code: `import { ArcangelModule } from "@arcangel/modules-sdk"`,
      output: `import { ArcangelModule } from "@arcangel/framework/modules-sdk"`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    {
      code: `import { TransactionOrchestrator } from "@arcangel/orchestration"`,
      output: `import { TransactionOrchestrator } from "@arcangel/framework/orchestration"`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    // Quote style preserved on autofix.
    {
      code: `import { ArcangelError } from '@arcangel/utils'`,
      output: `import { ArcangelError } from '@arcangel/framework/utils'`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    // Re-export of a deprecated package.
    {
      code: `export { ArcangelError } from "@arcangel/utils"`,
      output: `export { ArcangelError } from "@arcangel/framework/utils"`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    {
      code: `export * from "@arcangel/types"`,
      output: `export * from "@arcangel/framework/types"`,
      errors: [{ messageId: "useFrameworkEntrypoint" }],
    },
    // Deep dist import of the main package → no autofix.
    {
      code: `import { foo } from "@arcangel/arcangel/dist/utils/foo"`,
      errors: [{ messageId: "noInternalImport" }],
    },
    // Deep dist import of the framework package → no autofix.
    {
      code: `import { bar } from "@arcangel/framework/dist/utils"`,
      errors: [{ messageId: "noInternalImport" }],
    },
    // dist as the trailing segment.
    {
      code: `import x from "@arcangel/arcangel/dist"`,
      errors: [{ messageId: "noInternalImport" }],
    },
    // Nested dist segment.
    {
      code: `import x from "@arcangel/product/dist/services/product"`,
      errors: [{ messageId: "noInternalImport" }],
    },
    // Re-export from internal build output.
    {
      code: `export { x } from "@arcangel/arcangel/dist/x"`,
      errors: [{ messageId: "noInternalImport" }],
    },
  ],
})
