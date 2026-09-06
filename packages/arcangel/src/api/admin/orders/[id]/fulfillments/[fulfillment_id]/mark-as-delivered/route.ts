import { markOrderFulfillmentAsDeliveredWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntity,
} from "@arcangel/framework/http"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminMarkOrderFulfillmentAsDelivered,
    HttpTypes.AdminGetOrderParams
  >,
  res: ArcangelResponse<HttpTypes.AdminOrderResponse>
) => {
  const { id: orderId, fulfillment_id: fulfillmentId } = req.params

  await markOrderFulfillmentAsDeliveredWorkflow(req.scope).run({
    input: {
      orderId,
      fulfillmentId,
      no_notification: req.validatedBody.no_notification,
    },
  })

  const order = await refetchEntity({
    entity: "order",
    idOrFilter: orderId,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ order })
}
