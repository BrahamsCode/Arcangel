import { getOrderDetailWorkflow } from "@arcangel/core-flows"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

/**
 * This API route is intentionally unauthenticated as the order ID is a UUID that requires brute forcing to
 * gain access to. The order ID is used as the authentication mechanism to ensure that only the customer with the order ID can access the order details.
 *
 * To restrict access to this route, follow [this guide](https://docs.arcangel.com/resources/commerce-modules/order/secure-order-retrieval).
 */
export const GET = async (
  req: ArcangelRequest<HttpTypes.StoreGetOrderParams>,
  res: ArcangelResponse<HttpTypes.StoreOrderResponse>
) => {
  const workflow = getOrderDetailWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      fields: req.queryConfig.fields,
      order_id: req.params.id,
      filters: {
        is_draft_order: false,
      },
    },
  })

  res.status(200).json({ order: result as HttpTypes.StoreOrder })
}
