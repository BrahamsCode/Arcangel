import { validateAndTransformBody } from "@arcangel/framework"
import { MiddlewareRoute } from "@arcangel/framework/http"
import { AdminSetLayoutConfiguration } from "./validators"

export const layoutConfigurationRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/admin/layouts/:zone/configuration",
    middlewares: [validateAndTransformBody(AdminSetLayoutConfiguration)],
  },
]
