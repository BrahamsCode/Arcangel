import { createRuleTester } from "../../../test-utils"
import { rule } from "../rule"

const ruleTester = createRuleTester()

ruleTester.run("no-deprecated-remote-query-config", rule, {
  valid: [
    // Already using queryConfig.
    {
      code: `
        import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
        export const GET = async (req: ArcangelRequest, res: ArcangelResponse) => {
          const { fields } = req.queryConfig
        }
      `,
    },
    // Unrelated property on a typed req.
    {
      code: `
        import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
        export const GET = async (req: ArcangelRequest, res: ArcangelResponse) => {
          const id = req.params.id
        }
      `,
    },
    // remoteQueryConfig on something that isn't a typed Arcangel request.
    {
      code: `
        const obj = { remoteQueryConfig: {} }
        const cfg = obj.remoteQueryConfig
      `,
    },
    // req-named param in a non-handler function with no type annotation.
    {
      code: `
        function helper(req) {
          return req.remoteQueryConfig
        }
      `,
    },
    // Non-exported handler-named function.
    {
      code: `
        const GET = async (req, res) => {
          return req.remoteQueryConfig
        }
      `,
    },
    // Computed access.
    {
      code: `
        import { ArcangelRequest } from "@arcangel/framework/http"
        export const GET = async (req: ArcangelRequest, res: unknown) => {
          return req["remoteQueryConfig"]
        }
      `,
    },
    // Import from unrelated source — the local "ArcangelRequest" is not tracked.
    {
      code: `
        import { ArcangelRequest } from "some-other-pkg"
        function handler(req: ArcangelRequest) {
          return req.remoteQueryConfig
        }
      `,
    },
  ],
  invalid: [
    // Typed param via direct import.
    {
      code: `
        import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
        export const GET = async (req: ArcangelRequest, res: ArcangelResponse) => {
          const { fields } = req.remoteQueryConfig
        }
      `,
      errors: [{ messageId: "deprecatedRemoteQueryConfig" }],
      output: `
        import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
        export const GET = async (req: ArcangelRequest, res: ArcangelResponse) => {
          const { fields } = req.queryConfig
        }
      `,
    },
    // AuthenticatedArcangelRequest.
    {
      code: `
        import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
        export const POST = async (req: AuthenticatedArcangelRequest, res: ArcangelResponse) => {
          return req.remoteQueryConfig
        }
      `,
      errors: [{ messageId: "deprecatedRemoteQueryConfig" }],
      output: `
        import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
        export const POST = async (req: AuthenticatedArcangelRequest, res: ArcangelResponse) => {
          return req.queryConfig
        }
      `,
    },
    // Aliased import.
    {
      code: `
        import { ArcangelRequest as MReq } from "@arcangel/framework/http"
        function handler(req: MReq) {
          return req.remoteQueryConfig
        }
      `,
      errors: [{ messageId: "deprecatedRemoteQueryConfig" }],
      output: `
        import { ArcangelRequest as MReq } from "@arcangel/framework/http"
        function handler(req: MReq) {
          return req.queryConfig
        }
      `,
    },
    // Untyped param named `req` inside an exported handler.
    {
      code: `
        export const GET = async (req, res) => {
          return req.remoteQueryConfig
        }
      `,
      errors: [{ messageId: "deprecatedRemoteQueryConfig" }],
      output: `
        export const GET = async (req, res) => {
          return req.queryConfig
        }
      `,
    },
    // Function declaration handler.
    {
      code: `
        export async function DELETE(req, res) {
          const cfg = req.remoteQueryConfig
        }
      `,
      errors: [{ messageId: "deprecatedRemoteQueryConfig" }],
      output: `
        export async function DELETE(req, res) {
          const cfg = req.queryConfig
        }
      `,
    },
    // Multiple accesses.
    {
      code: `
        import { ArcangelRequest } from "@arcangel/framework/http"
        export const PATCH = async (req: ArcangelRequest, res) => {
          const a = req.remoteQueryConfig
          const b = req.remoteQueryConfig.fields
        }
      `,
      errors: [
        { messageId: "deprecatedRemoteQueryConfig" },
        { messageId: "deprecatedRemoteQueryConfig" },
      ],
      output: `
        import { ArcangelRequest } from "@arcangel/framework/http"
        export const PATCH = async (req: ArcangelRequest, res) => {
          const a = req.queryConfig
          const b = req.queryConfig.fields
        }
      `,
    },
    // Renamed param with type annotation.
    {
      code: `
        import { ArcangelRequest } from "@arcangel/framework/http"
        function helper(request: ArcangelRequest) {
          return request.remoteQueryConfig
        }
      `,
      errors: [{ messageId: "deprecatedRemoteQueryConfig" }],
      output: `
        import { ArcangelRequest } from "@arcangel/framework/http"
        function helper(request: ArcangelRequest) {
          return request.queryConfig
        }
      `,
    },
    // HttpTypes-qualified annotation.
    {
      code: `
        import { HttpTypes } from "@arcangel/framework/types"
        export const GET = async (req: HttpTypes.ArcangelRequest, res) => {
          return req.remoteQueryConfig
        }
      `,
      errors: [{ messageId: "deprecatedRemoteQueryConfig" }],
      output: `
        import { HttpTypes } from "@arcangel/framework/types"
        export const GET = async (req: HttpTypes.ArcangelRequest, res) => {
          return req.queryConfig
        }
      `,
    },
  ],
})
