import { listShippingOptionsForOrderWorkflow } from "@arcangel/core-flows"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { AdminShippingOption, HttpTypes } from "@arcangel/framework/types"

/**
 * @since 2.10.0
 */
export const GET = async (
  req: ArcangelRequest<{}, HttpTypes.AdminGetOrderShippingOptionList>,
  res: ArcangelResponse<{ shipping_options: AdminShippingOption[] }>
) => {
  const { id } = req.params

  const workflow = listShippingOptionsForOrderWorkflow(req.scope)
  const { result: shipping_options } = await workflow.run({
    input: {
      order_id: id,
    },
  })

  res.json({ shipping_options })
}
