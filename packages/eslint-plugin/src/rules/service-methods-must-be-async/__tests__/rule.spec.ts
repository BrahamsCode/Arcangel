import { createRuleTester } from "../../../test-utils"
import { rule } from "../rule"

const ruleTester = createRuleTester()

ruleTester.run("service-methods-must-be-async", rule, {
  valid: [
    // All methods async.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async create() {}
          async update() {}
        }
      `,
    },
    // Method with Promise return type annotation but no async (e.g. delegates to another async fn).
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          fetch(): Promise<void> {
            return Promise.resolve()
          }
        }
      `,
    },
    // Constructor is not flagged.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() {
            super(...arguments)
          }
          async create() {}
        }
      `,
    },
    // Private/protected methods are not flagged.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          private helper() {}
          protected internal() {}
          async publicOne() {}
        }
      `,
    },
    // Static method that's already async is fine.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          static async helper() {}
          async run() {}
        }
      `,
    },
    // Getters and setters are exempt — they can't be async and are accessed as
    // properties, not invoked like service methods.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          get name() { return "foo" }
          set name(v: string) {}
          get model() { return this.model_ }
          async run() {}
        }
      `,
    },
    // Class whose name doesn't end in "Service" and doesn't extend ArcangelService is ignored.
    {
      code: `
        class Plain {
          create() {}
        }
      `,
    },
    // A `*Service`-named class that doesn't extend `ArcangelService` is NOT
    // treated as a service — its sync methods are allowed, regardless of file
    // location. (Fixes false positives on helper classes like
    // `EntityDiscoveryService`.)
    {
      filename: "/repo/packages/modules/settings/src/utils/entity-discovery.ts",
      code: `
        export class EntityDiscoveryService {
          discover() {}
        }
      `,
    },
    // A plain class in a module's service location that doesn't extend
    // `ArcangelService` is not checked, even when its methods are sync.
    {
      filename: "/repo/packages/modules/order/src/services/order.ts",
      code: `
        class OrderHelper {
          create() {}
        }
      `,
    },
    {
      filename: "/repo/packages/modules/order/src/service.ts",
      code: `
        class OrderModuleService {
          create() {}
        }
      `,
    },
    // ArcangelService imported from a non-framework source is ignored (and class isn't named *Service).
    {
      code: `
        import { ArcangelService } from "some-other-lib"
        class Foo extends ArcangelService({}) {
          create() {}
        }
      `,
    },
    // Class extends something other than ArcangelService, and isn't named *Service.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class Foo extends SomethingElse {
          create() {}
        }
      `,
    },
    // Honors aliased ArcangelService import.
    {
      code: `
        import { ArcangelService as MS } from "@arcangel/framework/utils"
        class FooService extends MS({}) {
          async create() {}
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          create() {}
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async create() {}
        }
      `,
      errors: [{ messageId: "methodMustBeAsync" }],
    },
    // Multiple non-async methods.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          create() {}
          update() {}
          async remove() {}
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async create() {}
          async update() {}
          async remove() {}
        }
      `,
      errors: [
        { messageId: "methodMustBeAsync" },
        { messageId: "methodMustBeAsync" },
      ],
    },
    // Non-Promise return type annotation.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          fetch(): void {}
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async fetch(): void {}
        }
      `,
      errors: [{ messageId: "methodMustBeAsync" }],
    },
    // Aliased ArcangelService import.
    {
      code: `
        import { ArcangelService as MS } from "@arcangel/framework/utils"
        class FooService extends MS({}) {
          create() {}
        }
      `,
      output: `
        import { ArcangelService as MS } from "@arcangel/framework/utils"
        class FooService extends MS({}) {
          async create() {}
        }
      `,
      errors: [{ messageId: "methodMustBeAsync" }],
    },
    // Class expression.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        const FooService = class extends ArcangelService({}) {
          create() {}
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        const FooService = class extends ArcangelService({}) {
          async create() {}
        }
      `,
      errors: [{ messageId: "methodMustBeAsync" }],
    },
    // Static methods are invocable from outside the service, so they must be async too.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          static helper() {}
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          static async helper() {}
        }
      `,
      errors: [{ messageId: "methodMustBeAsync" }],
    },
  ],
})
