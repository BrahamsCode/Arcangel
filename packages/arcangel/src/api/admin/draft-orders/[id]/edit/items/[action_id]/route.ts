import {
  removeDraftOrderActionItemWorkflow,
  updateDraftOrderActionItemWorkflow,
} from "@arcangel/core-flows"
import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"

export const POST = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminUpdateDraftOrderActionItem>,
  res: ArcangelResponse
) => {
  const { id, action_id } = req.params

  const { result } = await updateDraftOrderActionItemWorkflow(req.scope).run({
    input: {
      data: req.validatedBody,
      order_id: id,
      action_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse
) => {
  const { id, action_id } = req.params

  const { result } = await removeDraftOrderActionItemWorkflow(req.scope).run({
    input: {
      order_id: id,
      action_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
