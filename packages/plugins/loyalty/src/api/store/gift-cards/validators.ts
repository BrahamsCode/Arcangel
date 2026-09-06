import { createSelectParams } from "@arcangel/arcangel/api/utils/validators";
import { z } from "@arcangel/framework/zod";

export type StoreGetGiftCardsParamsType = z.infer<
  typeof StoreGetGiftCardParams
>;
export const StoreGetGiftCardParams = createSelectParams();

export type StoreRedeemGiftCardType = z.infer<typeof StoreRedeemGiftCard>;
export const StoreRedeemGiftCard = z.strictObject({});
