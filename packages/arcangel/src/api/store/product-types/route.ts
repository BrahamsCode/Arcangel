import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.StoreProductTypeListParams>,
  res: ArcangelResponse<HttpTypes.StoreProductTypeListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: product_types, metadata } = await query.graph(
    {
      entity: "product_type",
      filters: req.filterableFields,
      pagination: req.queryConfig.pagination,
      fields: req.queryConfig.fields,
    },
    {
      locale: req.locale,
    }
  )

  res.json({
    product_types,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 0,
  })
}
