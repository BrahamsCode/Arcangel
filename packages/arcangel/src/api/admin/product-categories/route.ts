import { createProductCategoriesWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntities,
} from "@arcangel/framework/http"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminProductCategoryListParams>,
  res: ArcangelResponse<HttpTypes.AdminProductCategoryListResponse>
) => {
  const { data: product_categories, metadata } = await refetchEntities({
    entity: "product_category",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  res.json({
    product_categories,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminCreateProductCategory,
    HttpTypes.AdminProductCategoryParams
  >,
  res: ArcangelResponse<HttpTypes.AdminProductCategoryResponse>
) => {
  const { result } = await createProductCategoriesWorkflow(req.scope).run({
    input: { product_categories: [req.validatedBody] },
  })

  const {
    data: [category],
  } = await refetchEntities({
    entity: "product_category",
    idOrFilter: { id: result[0].id, ...req.filterableFields },
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  const response: HttpTypes.AdminProductCategoryResponse = {
    product_category: category as HttpTypes.AdminProductCategory,
  }

  res.status(200).json(response)
}
