import {
  deleteProductCategoriesWorkflow,
  updateProductCategoriesWorkflow,
} from "@arcangel/core-flows"
import {
  AdminProductCategoryResponse,
  HttpTypes,
} from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntities,
} from "@arcangel/framework/http"
import { ArcangelError } from "@arcangel/framework/utils"

export const GET = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminProductCategoryListParams
  >,
  res: ArcangelResponse<AdminProductCategoryResponse>
) => {
  const {
    data: [category],
  } = await refetchEntities({
    entity: "product_category",
    idOrFilter: { id: req.params.id, ...req.filterableFields },
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  if (!category) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product category with id: ${req.params.id} was not found`
    )
  }

  res.json({ product_category: category })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateProductCategory,
    HttpTypes.AdminProductCategoryParams
  >,
  res: ArcangelResponse<AdminProductCategoryResponse>
) => {
  const { id } = req.params

  await updateProductCategoriesWorkflow(req.scope).run({
    input: { selector: { id }, update: req.validatedBody },
  })

  const {
    data: [category],
  } = await refetchEntities({
    entity: "product_category",
    idOrFilter: { id, ...req.filterableFields },
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  res.status(200).json({ product_category: category })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminProductCategoryDeleteResponse>
) => {
  const id = req.params.id

  await deleteProductCategoriesWorkflow(req.scope).run({
    input: [id],
  })

  res.status(200).json({
    id,
    object: "product_category",
    deleted: true,
  })
}
