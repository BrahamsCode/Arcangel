import { HttpTypes } from "@arcangel/framework/types"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

/**
 * @since 2.16.0
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.StoreProductOptionListParams>,
  res: ArcangelResponse<HttpTypes.StoreProductOptionListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: product_options, metadata } = await query.graph({
    entity: "product_option",
    filters: req.filterableFields,
    pagination: req.queryConfig.pagination,
    fields: req.queryConfig.fields,
  })

  res.json({
    product_options,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 0,
  })
}
