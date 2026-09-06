import {
  authenticate,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@arcangel/framework";
import { MiddlewareRoute } from "@arcangel/arcangel";
import { retrieveGiftCardTransformQueryConfig } from "./query-config";
import { StoreGetGiftCardParams, StoreRedeemGiftCard } from "./validators";

export const storeGiftCardsMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/store/gift-cards/:code",
    middlewares: [
      validateAndTransformQuery(
        StoreGetGiftCardParams,
        retrieveGiftCardTransformQueryConfig
      ),
    ],
  },
];
