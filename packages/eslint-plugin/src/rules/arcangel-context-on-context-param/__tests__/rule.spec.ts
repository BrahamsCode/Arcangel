import { createRuleTester } from "../../../test-utils"
import { rule } from "../rule"

const ruleTester = createRuleTester()

ruleTester.run("arcangel-context-on-context-param", rule, {
  valid: [
    // Context param decorated with @ArcangelContext().
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(@ArcangelContext() sharedContext: Context = {}) {}
        }
      `,
    },
    // Decorator on a plain (no-default) Context param.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async retrieve(id: string, @ArcangelContext() sharedContext: Context) {}
        }
      `,
    },
    // Method without a Context parameter — not flagged.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(filters: object) {}
        }
      `,
    },
    // Non-service class — not checked.
    {
      code: `
        class Plain {
          async list(sharedContext: Context = {}) {}
        }
      `,
    },
    // Constructor with Context param is exempt.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor(sharedContext: Context) {
            super(...arguments)
          }
        }
      `,
    },
    // Aliased decorator import is honored.
    {
      code: `
        import { ArcangelService, ArcangelContext as MC } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(@MC() sharedContext: Context = {}) {}
        }
      `,
    },
    // Protected method with decorated Context param.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          protected async list_(@ArcangelContext() sharedContext: Context = {}) {}
        }
      `,
    },
    // A `*Service`-named class that doesn't extend `ArcangelService` is not a
    // service class — its bare `Context` param is not flagged.
    {
      code: `
        import { ArcangelContext } from "@arcangel/framework/utils"
        class OrderService {
          async list(sharedContext: Context = {}) {}
        }
      `,
    },
    // Overload signatures (bodyless) with a bare Context param are ignored —
    // the decorator lives on the implementation, which carries it here.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          list(id: string, sharedContext?: Context): Promise<string>
          list(id: number, sharedContext?: Context): Promise<number>
          async list(id: any, @ArcangelContext() sharedContext: Context = {}): Promise<any> {}
        }
      `,
    },
  ],
  invalid: [
    // Public method with bare Context param — autofix inserts decorator.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(@ArcangelContext() sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingArcangelContext" }],
    },
    // Bare Context param with no default — autofix.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async retrieve(id: string, sharedContext: Context) {}
        }
      `,
      output: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async retrieve(id: string, @ArcangelContext() sharedContext: Context) {}
        }
      `,
      errors: [{ messageId: "missingArcangelContext" }],
    },
    // No import for ArcangelContext — reported without autofix.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
        }
      `,
      output: null,
      errors: [{ messageId: "missingArcangelContext" }],
    },
    // Honors aliased decorator import in the autofix.
    {
      code: `
        import { ArcangelService, ArcangelContext as MC } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, ArcangelContext as MC } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(@MC() sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingArcangelContext" }],
    },
    // Protected method with bare Context param.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          protected async list_(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          protected async list_(@ArcangelContext() sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingArcangelContext" }],
    },
    // Multiple methods on the same class, each reported.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
          protected async list_(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(@ArcangelContext() sharedContext: Context = {}) {}
          protected async list_(@ArcangelContext() sharedContext: Context = {}) {}
        }
      `,
      errors: [
        { messageId: "missingArcangelContext" },
        { messageId: "missingArcangelContext" },
      ],
    },
    // Context param after non-Context params is correctly targeted.
    {
      code: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async retrieve(id: string, filters: object, sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, ArcangelContext } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async retrieve(id: string, filters: object, @ArcangelContext() sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingArcangelContext" }],
    },
  ],
})
