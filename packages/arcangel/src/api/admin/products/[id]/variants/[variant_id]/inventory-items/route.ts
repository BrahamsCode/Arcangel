import { createLinksWorkflow } from "@arcangel/core-flows"
import { Modules } from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { refetchVariant } from "../../../../helpers"
import { HttpTypes } from "@arcangel/framework/types"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminCreateVariantInventoryItem,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.AdminProductVariantResponse>
) => {
  const variantId = req.params.variant_id

  await createLinksWorkflow(req.scope).run({
    input: [
      {
        [Modules.PRODUCT]: { variant_id: variantId },
        [Modules.INVENTORY]: {
          inventory_item_id: req.validatedBody.inventory_item_id,
        },
        data: { required_quantity: req.validatedBody.required_quantity },
      },
    ],
  })

  const variant = await refetchVariant(
    variantId,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ variant })
}
