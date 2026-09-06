import { batchLinkProductsToCategoryWorkflow } from "@arcangel/core-flows"
import {
  AdminProductCategoryResponse,
  HttpTypes,
} from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntity,
} from "@arcangel/framework/http"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminBatchLink,
    HttpTypes.AdminProductCategoryParams
  >,
  res: ArcangelResponse<AdminProductCategoryResponse>
) => {
  const { id } = req.params

  await batchLinkProductsToCategoryWorkflow(req.scope).run({
    input: { id, ...req.validatedBody },
  })

  const category = await refetchEntity({
    entity: "product_category",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ product_category: category })
}
