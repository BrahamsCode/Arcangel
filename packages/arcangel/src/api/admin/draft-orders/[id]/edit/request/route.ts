import { requestDraftOrderEditWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/types"

export const POST = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse
) => {
  const { id } = req.params

  const { result } = await requestDraftOrderEditWorkflow(req.scope).run({
    input: {
      order_id: id,
      requested_by: req.auth_context.actor_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
