import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminStoreListParams>,
  res: ArcangelResponse<HttpTypes.AdminStoreListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "store",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: stores, metadata } = await remoteQuery(queryObject)
  res.json({
    stores,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
