import { updateDraftOrderItemWorkflow } from "@arcangel/core-flows"
import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"
import { AdminUpdateDraftOrderItemType } from "../../../../../validators"

export const POST = async (
  req: AuthenticatedArcangelRequest<AdminUpdateDraftOrderItemType>,
  res: ArcangelResponse
) => {
  const { id, item_id } = req.params

  const { result } = await updateDraftOrderItemWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
      items: [
        {
          ...req.validatedBody,
          id: item_id,
        },
      ],
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
