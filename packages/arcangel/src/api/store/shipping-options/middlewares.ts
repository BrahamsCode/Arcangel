import {
  MiddlewareRoute,
  validateAndTransformBody,
} from "@arcangel/framework/http"
import { validateAndTransformQuery } from "@arcangel/framework"
import { listTransformQueryConfig } from "./query-config"
import {
  StoreCalculateShippingOptionPrice,
  StoreGetShippingOptions,
  StoreGetShippingOptionsParams,
} from "./validators"
import * as QueryConfig from "./query-config"

export const storeShippingOptionRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/store/shipping-options",
    middlewares: [
      validateAndTransformQuery(
        StoreGetShippingOptions,
        listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/store/shipping-options/:id/calculate",
    middlewares: [
      validateAndTransformQuery(
        StoreGetShippingOptionsParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
      validateAndTransformBody(StoreCalculateShippingOptionPrice),
    ],
  },
]
