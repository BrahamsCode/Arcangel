import {
  beginDraftOrderEditWorkflow,
  cancelDraftOrderEditWorkflow,
} from "@arcangel/core-flows"
import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"

export const POST = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse
) => {
  const { id } = req.params

  const { result } = await beginDraftOrderEditWorkflow(req.scope).run({
    input: {
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminDraftOrderPreview,
  })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse
) => {
  const { id } = req.params

  await cancelDraftOrderEditWorkflow(req.scope).run({
    input: {
      order_id: id,
    },
  })

  res.status(200).json({
    id,
    object: "draft-order-edit",
    deleted: true,
  })
}
