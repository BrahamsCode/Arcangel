import {
  deleteProductTypesWorkflow,
  updateProductTypesWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

import { refetchProductType } from "../helpers"
import { HttpTypes } from "@arcangel/framework/types"
import { ArcangelError } from "@arcangel/framework/utils"

export const GET = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminProductTypeParams
  >,
  res: ArcangelResponse<HttpTypes.AdminProductTypeResponse>
) => {
  const productType = await refetchProductType(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_type: productType })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateProductType,
    HttpTypes.AdminProductTypeParams
  >,
  res: ArcangelResponse<HttpTypes.AdminProductTypeResponse>
) => {
  const existingProductType = await refetchProductType(
    req.params.id,
    req.scope,
    ["id"]
  )

  if (!existingProductType) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product type with id "${req.params.id}" not found`
    )
  }

  const { result } = await updateProductTypesWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const productType = await refetchProductType(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_type: productType })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminProductTypeDeleteResponse>
) => {
  const id = req.params.id

  await deleteProductTypesWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "product_type",
    deleted: true,
  })
}
