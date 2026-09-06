import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

/**
 * @since 2.12.3
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminPriceListParams>,
  res: ArcangelResponse<HttpTypes.AdminPriceListPriceListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const result = await query.graph({
    entity: "price",
    fields: req.queryConfig.fields,
    filters: {
      ...req.filterableFields,
      price_list_id: req.params.id,
    },
    pagination: req.queryConfig.pagination,
  })

  res.status(200).json({
    prices: result.data,
    count: result.metadata?.count ?? 0,
    offset: result.metadata?.skip ?? 0,
    limit: result.metadata?.take ?? 0,
  })
}
