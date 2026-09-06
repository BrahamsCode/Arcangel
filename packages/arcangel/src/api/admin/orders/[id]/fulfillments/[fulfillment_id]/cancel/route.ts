import { cancelOrderFulfillmentWorkflow } from "@arcangel/core-flows"
import { AdditionalData, HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { AdminOrderCancelFulfillmentType } from "../../../../validators"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    AdminOrderCancelFulfillmentType & AdditionalData
  >,
  res: ArcangelResponse<HttpTypes.AdminOrderResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { id: req.params.id }

  const input = {
    ...req.validatedBody,
    order_id: req.params.id,
    fulfillment_id: req.params.fulfillment_id,
    canceled_by: req.auth_context.actor_id,
  }

  await cancelOrderFulfillmentWorkflow(req.scope).run({
    input,
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables,
    fields: req.queryConfig.fields,
  })

  const [order] = await remoteQuery(queryObject)
  res.status(200).json({ order })
}
