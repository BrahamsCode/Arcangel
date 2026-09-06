import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.StoreCollectionListParams>,
  res: ArcangelResponse<HttpTypes.StoreCollectionListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: collections, metadata } = await query.graph(
    {
      entity: "product_collection",
      filters: req.filterableFields,
      pagination: req.queryConfig.pagination,
      fields: req.queryConfig.fields,
    },
    {
      locale: req.locale,
    }
  )

  res.json({
    collections,
    count: metadata!.count,
    offset: metadata!.skip,
    limit: metadata!.take,
  })
}
