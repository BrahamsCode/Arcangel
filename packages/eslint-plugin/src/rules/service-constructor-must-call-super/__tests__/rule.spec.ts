import { createRuleTester } from "../../../test-utils"
import { rule } from "../rule"

const ruleTester = createRuleTester()

ruleTester.run("service-constructor-must-call-super", rule, {
  valid: [
    // Constructor with super(...arguments).
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() {
            super(...arguments)
          }
        }
      `,
    },
    // Constructor with a bare super() call also satisfies the rule.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor(container) {
            super(container)
          }
        }
      `,
    },
    // No constructor defined — nothing to flag.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          async create() {}
        }
      `,
    },
    // Class doesn't extend ArcangelService — out of scope (even with *Service name).
    {
      code: `
        class FooService {
          constructor() {}
        }
      `,
    },
    // ArcangelService imported from a non-framework source is ignored.
    {
      code: `
        import { ArcangelService } from "some-other-lib"
        class FooService extends ArcangelService({}) {
          constructor() {}
        }
      `,
    },
    // Class extends something other than ArcangelService.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends SomethingElse {
          constructor() {}
        }
      `,
    },
    // Honors aliased ArcangelService import.
    {
      code: `
        import { ArcangelService as MS } from "@arcangel/framework/utils"
        class FooService extends MS({}) {
          constructor() {
            super(...arguments)
          }
        }
      `,
    },
    // super() call interleaved with other statements is still fine.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor(container) {
            this.foo = "bar"
            super(container)
          }
        }
      `,
    },
  ],
  invalid: [
    // Empty constructor body.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() {}
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() { super(...arguments) }
        }
      `,
      errors: [{ messageId: "missingSuperCall" }],
    },
    // Multi-line empty body — fixer must insert with newline + indentation,
    // not jam everything on the opening-brace line.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() {

          }
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() {
            super(...arguments)
          }
        }
      `,
      errors: [{ messageId: "missingSuperCall" }],
    },
    // Constructor body with statements but no super call.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor(container) {
            this.container = container
          }
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor(container) {
            super(...arguments)
            this.container = container
          }
        }
      `,
      errors: [{ messageId: "missingSuperCall" }],
    },
    // Aliased ArcangelService import.
    {
      code: `
        import { ArcangelService as MS } from "@arcangel/framework/utils"
        class FooService extends MS({}) {
          constructor() {}
        }
      `,
      output: `
        import { ArcangelService as MS } from "@arcangel/framework/utils"
        class FooService extends MS({}) {
          constructor() { super(...arguments) }
        }
      `,
      errors: [{ messageId: "missingSuperCall" }],
    },
    // Class expression.
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        const FooService = class extends ArcangelService({}) {
          constructor() {}
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        const FooService = class extends ArcangelService({}) {
          constructor() { super(...arguments) }
        }
      `,
      errors: [{ messageId: "missingSuperCall" }],
    },
    // Constructor calls something that looks like super but isn't (e.g. a method named super-something).
    {
      code: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() {
            this.init()
          }
        }
      `,
      output: `
        import { ArcangelService } from "@arcangel/framework/utils"
        class FooService extends ArcangelService({}) {
          constructor() {
            super(...arguments)
            this.init()
          }
        }
      `,
      errors: [{ messageId: "missingSuperCall" }],
    },
  ],
})
