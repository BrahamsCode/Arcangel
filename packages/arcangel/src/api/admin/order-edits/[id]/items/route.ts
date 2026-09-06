import { orderEditAddNewItemWorkflow } from "@arcangel/core-flows"

import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { AdminPostOrderEditsAddItemsReqSchemaType } from "../../validators"

export const POST = async (
  req: AuthenticatedArcangelRequest<AdminPostOrderEditsAddItemsReqSchemaType>,
  res: ArcangelResponse<HttpTypes.AdminOrderEditPreviewResponse>
) => {
  const { id } = req.params

  const { result } = await orderEditAddNewItemWorkflow(req.scope).run({
    input: { ...req.validatedBody, order_id: id },
  })

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
