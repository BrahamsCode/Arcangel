import type {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework";
import { ContainerRegistrationKeys } from "@arcangel/framework/utils";
import { HttpTypes } from "@arcangel/framework/types";
import { addGiftCardToCartWorkflow } from "../../../../../workflows/carts/workflows/add-gift-card-to-cart";
import { removeGiftCardFromCartWorkflow } from "../../../../../workflows/carts/workflows/remove-gift-cart-from-cart";
import { StoreAddGiftCardToCart, StoreRemoveGiftCardFromCart } from "../../../../../types";

export const POST = async (
  req: AuthenticatedArcangelRequest<StoreAddGiftCardToCart>,
  res: ArcangelResponse<HttpTypes.StoreCartResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const { id } = req.params;

  await addGiftCardToCartWorkflow.run({
    input: {
      cart_id: id,
      ...req.validatedBody,
    },
    container: req.scope,
  });

  const {
    data: [cart],
  } = await query.graph(
    {
      entity: "cart",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ cart });
};

export const DELETE = async (
  req: AuthenticatedArcangelRequest<StoreRemoveGiftCardFromCart>,
  res: ArcangelResponse<HttpTypes.StoreCartResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  await removeGiftCardFromCartWorkflow.run({
    input: {
      cart_id: id,
      ...req.body,
    },

    container: req.scope,
  });

  const {
    data: [cart],
  } = await query.graph(
    {
      entity: "cart",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ cart });
};
