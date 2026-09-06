import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import { createAndLinkProductOptionsToProductWorkflow } from "@arcangel/core-flows"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"
import { remapKeysForProduct, remapProductResponse } from "../../../helpers"

/**
 * @since 2.17.0
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminLinkProductOptions>,
  res: ArcangelResponse<HttpTypes.AdminProductResponse>
) => {
  const productId = req.params.id

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  await createAndLinkProductOptionsToProductWorkflow(req.scope).run({
    input: {
      product_id: productId,
      ...req.validatedBody,
    },
  })

  const { data: products } = await query.graph({
    entity: "product",
    filters: { id: productId },
    fields: remapKeysForProduct(req.queryConfig.fields ?? []),
  })
  const product = products[0]

  res.status(200).json({ product: remapProductResponse(product) })
}
