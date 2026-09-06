import { addDraftOrderShippingMethodsWorkflow } from "@arcangel/core-flows"
import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"
import { AdminAddDraftOrderShippingMethodType } from "../../../validators"

export const POST = async (
  req: AuthenticatedArcangelRequest<AdminAddDraftOrderShippingMethodType>,
  res: ArcangelResponse
) => {
  const { id } = req.params

  const { result } = await addDraftOrderShippingMethodsWorkflow(req.scope).run({
    input: {
      order_id: id,
      ...req.validatedBody,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
