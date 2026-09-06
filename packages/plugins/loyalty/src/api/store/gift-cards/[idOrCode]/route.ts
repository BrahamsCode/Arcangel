import type {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework";
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils";
import { StoreGetGiftCardParams } from "../../../../types";

export const GET = async (
  req: AuthenticatedArcangelRequest<StoreGetGiftCardParams>,
  res: ArcangelResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { idOrCode: code } = req.params;

  if (!code?.length) {
    throw new ArcangelError(
      ArcangelError.Types.INVALID_ARGUMENT,
      "Code is required"
    );
  }

  const {
    data: [gift_card],
  } = await query.graph({
    entity: "gift_cards",
    fields: req.queryConfig.fields,
    filters: {
      code,
    },
  });

  if (!gift_card) {
    throw new ArcangelError(ArcangelError.Types.NOT_FOUND, "Gift card not found");
  }

  res.json({ gift_card });
};
