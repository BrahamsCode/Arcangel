import { createRuleTester } from "../../../test-utils"
import { rule } from "../rule"

const ruleTester = createRuleTester()

ruleTester.run("use-inject-manager-on-public-methods", rule, {
  valid: [
    // Public method with @InjectManager() decorator.
    {
      code: `
        import { ArcangelService, InjectManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectManager()
          async list(sharedContext: Context = {}) {}
        }
      `,
    },
    // Protected method with @InjectTransactionManager() decorator.
    {
      code: `
        import { ArcangelService, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectTransactionManager()
          protected async list_(sharedContext: Context = {}) {}
        }
      `,
    },
    // Method without a Context parameter is not flagged.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(filters: object) {}
        }
      `,
    },
    // Private method with @InjectTransactionManager() decorator.
    {
      code: `
        import { ArcangelService, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectTransactionManager()
          private async helper(sharedContext: Context = {}) {}
        }
      `,
    },
    // Non-service class is not checked.
    {
      code: `
        class Plain {
          async list(sharedContext: Context = {}) {}
        }
      `,
    },
    // A `*Service`-named class that doesn't extend `ArcangelService` is not a
    // service class — its undecorated Context method is not flagged.
    {
      code: `
        import { InjectManager } from "@arcangel/framework/utils"
        class OrderService {
          async list(sharedContext: Context = {}) {}
        }
      `,
    },
    // Constructor is exempt.
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
        import { ArcangelService, InjectManager as IM } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @IM()
          async list(sharedContext: Context = {}) {}
        }
      `,
    },
    // Getter / setter / static methods aren't covered by this rule (no Context params anyway).
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          get name() { return "foo" }
          static helper() {}
        }
      `,
    },
    // Overload signatures (bodyless) are ignored — the decorator lives on the
    // implementation, which carries it here.
    {
      code: `
        import { ArcangelService, InjectManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          list(id: string, sharedContext?: Context): Promise<string>
          list(id: number, sharedContext?: Context): Promise<number>
          @InjectManager()
          async list(id: any, sharedContext: Context = {}): Promise<any> {}
        }
      `,
    },
  ],
  invalid: [
    // Public method with Context param missing @InjectManager() — autofix inserts decorator.
    {
      code: `
        import { ArcangelService, InjectManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, InjectManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectManager()
          async list(sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingInjectManager" }],
    },
    // Protected method with Context param missing @InjectTransactionManager() — autofix.
    {
      code: `
        import { ArcangelService, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          protected async list_(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectTransactionManager()
          protected async list_(sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingInjectTransactionManager" }],
    },
    // No import for the decorator — reported without autofix.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
        }
      `,
      output: null,
      errors: [{ messageId: "missingInjectManager" }],
    },
    // Honors aliased decorator import in the autofix.
    {
      code: `
        import { ArcangelService, InjectManager as IM } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, InjectManager as IM } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @IM()
          async list(sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingInjectManager" }],
    },
    // Decorator inserted before existing unrelated decorator.
    {
      code: `
        import { ArcangelService, InjectManager, EmitEvents } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @EmitEvents()
          async list(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, InjectManager, EmitEvents } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectManager()
          @EmitEvents()
          async list(sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingInjectManager" }],
    },
    // Multiple methods on the same class are each reported.
    {
      code: `
        import { ArcangelService, InjectManager, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async list(sharedContext: Context = {}) {}
          protected async list_(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, InjectManager, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectManager()
          async list(sharedContext: Context = {}) {}
          @InjectTransactionManager()
          protected async list_(sharedContext: Context = {}) {}
        }
      `,
      errors: [
        { messageId: "missingInjectManager" },
        { messageId: "missingInjectTransactionManager" },
      ],
    },
    // Private method missing @InjectTransactionManager() is flagged like protected.
    {
      code: `
        import { ArcangelService, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          private async helper(sharedContext: Context = {}) {}
        }
      `,
      output: `
        import { ArcangelService, InjectTransactionManager } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          @InjectTransactionManager()
          private async helper(sharedContext: Context = {}) {}
        }
      `,
      errors: [{ messageId: "missingInjectTransactionManager" }],
    },
  ],
})
