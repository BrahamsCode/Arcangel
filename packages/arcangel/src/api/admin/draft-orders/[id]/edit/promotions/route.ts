import {
  addDraftOrderPromotionWorkflow,
  removeDraftOrderPromotionsWorkflow,
} from "@arcangel/core-flows"
import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"
import {
  AdminAddDraftOrderPromotionsType,
  AdminRemoveDraftOrderPromotionsType,
} from "../../../validators"

export const POST = async (
  req: AuthenticatedArcangelRequest<AdminAddDraftOrderPromotionsType>,
  res: ArcangelResponse<HttpTypes.AdminDraftOrderPreviewResponse>
) => {
  const { id } = req.params

  const { result } = await addDraftOrderPromotionWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest<AdminRemoveDraftOrderPromotionsType>,
  res: ArcangelResponse<HttpTypes.AdminDraftOrderPreviewResponse>
) => {
  const { id } = req.params

  const { result } = await removeDraftOrderPromotionsWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
