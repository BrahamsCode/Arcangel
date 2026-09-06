import { addToCartWorkflowId } from "@arcangel/core-flows"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import { AdditionalData } from "@arcangel/types"
import { Modules } from "@arcangel/utils"
import { refetchCart } from "../../helpers"

export const POST = async (
  req: ArcangelRequest<
    HttpTypes.StoreAddCartLineItem & AdditionalData,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.StoreCartResponse>
) => {
  const we = req.scope.resolve(Modules.WORKFLOW_ENGINE)
  await we.run(addToCartWorkflowId, {
    input: {
      cart_id: req.params.id,
      items: [req.validatedBody],
      additional_data: req.validatedBody.additional_data,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
