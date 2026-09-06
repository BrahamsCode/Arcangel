import { listShippingOptionsForCartWorkflow } from "@arcangel/core-flows"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: ArcangelRequest<{}, HttpTypes.StoreGetShippingOptionList>,
  res: ArcangelResponse<HttpTypes.StoreShippingOptionListResponse>
) => {
  const { cart_id, is_return } = req.filterableFields

  const workflow = listShippingOptionsForCartWorkflow(req.scope)
  const { result: shipping_options } = await workflow.run({
    input: {
      cart_id,
      is_return: !!is_return,
      fields: req.queryConfig.fields,
    },
  })

  res.json({ shipping_options })
}
