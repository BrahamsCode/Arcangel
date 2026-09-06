import { requestOrderEditRequestWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

export const POST = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminRequestOrderEdit>,
  res: ArcangelResponse<HttpTypes.AdminOrderEditPreviewResponse>
) => {
  const { id } = req.params

  const { result } = await requestOrderEditRequestWorkflow(req.scope).run({
    input: {
      order_id: id,
      requested_by: req.auth_context.actor_id,
      no_notification: req.validatedBody?.no_notification,
    },
  })

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
