import {
  deleteProductOptionsWorkflow,
  updateProductOptionsWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

import { HttpTypes } from "@arcangel/framework/types"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

/**
 * @since 2.16.0
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<{}, HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.AdminProductOptionResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const {
    data: [product_option],
  } = await query.graph({
    entity: "product_option",
    filters: { id: req.params.id },
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ product_option })
}

/**
 * @since 2.16.0
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminUpdateProductOption>,
  res: ArcangelResponse<HttpTypes.AdminProductOptionResponse>
) => {
  const { result } = await updateProductOptionsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const {
    data: [product_option],
  } = await query.graph({
    entity: "product_option",
    filters: { id: result[0].id },
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ product_option })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminProductOptionDeleteResponse>
) => {
  const id = req.params.id

  await deleteProductOptionsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "product_option",
    deleted: true,
  })
}
