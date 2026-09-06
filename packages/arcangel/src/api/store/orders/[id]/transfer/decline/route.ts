import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/framework/types"
import {
  declineOrderTransferRequestWorkflow,
  getOrderDetailWorkflow,
} from "@arcangel/core-flows"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.StoreDeclineOrderTransfer,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.StoreOrderResponse>
) => {
  await declineOrderTransferRequestWorkflow(req.scope).run({
    input: {
      order_id: req.params.id,
      token: req.validatedBody.token,
    },
  })

  const { result } = await getOrderDetailWorkflow(req.scope).run({
    input: {
      fields: req.queryConfig.fields,
      order_id: req.params.id,
    },
  })

  res.status(200).json({ order: result as HttpTypes.StoreOrder })
}
