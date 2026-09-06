import { validateAndTransformQuery } from "@arcangel/framework"
import { MiddlewareRoute } from "@arcangel/framework/http"
import * as QueryConfig from "./query-config"
import { AdminGetLayoutConfigurationsParams } from "./validators"

export const layoutConfigurationListRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/layouts/configurations",
    middlewares: [
      validateAndTransformQuery(
        AdminGetLayoutConfigurationsParams,
        QueryConfig.retrieveLayoutConfigurationList
      ),
    ],
  },
]
