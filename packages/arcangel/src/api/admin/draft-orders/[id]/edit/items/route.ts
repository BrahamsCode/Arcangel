import { addDraftOrderItemsWorkflow } from "@arcangel/core-flows"
import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"
import { AdminAddDraftOrderItemsType } from "../../../validators"

export const POST = async (
  req: AuthenticatedArcangelRequest<AdminAddDraftOrderItemsType>,
  res: ArcangelResponse
) => {
  const { id } = req.params

  const { result } = await addDraftOrderItemsWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
