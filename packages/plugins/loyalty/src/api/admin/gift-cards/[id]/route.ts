import type {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework";
import { ContainerRegistrationKeys } from "@arcangel/framework/utils";
import { updateGiftCardsWorkflow } from "../../../../workflows/gift-cards/workflows/update-gift-cards";
import { AdminGiftCardResponse, AdminUpdateGiftCardParams } from "../../../../types";

export const GET = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<AdminGiftCardResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  const {
    data: [gift_card],
  } = await query.graph(
    {
      entity: "gift_cards",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ gift_card });
};

export const POST = async (
  req: AuthenticatedArcangelRequest<AdminUpdateGiftCardParams>,
  res: ArcangelResponse<AdminGiftCardResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  await query.graph(
    {
      entity: "gift_cards",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  await updateGiftCardsWorkflow.run({
    input: [
      {
        id,
        ...req.body,
      },
    ],
  });

  const {
    data: [gift_card],
  } = await query.graph(
    {
      entity: "gift_cards",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ gift_card });
};
