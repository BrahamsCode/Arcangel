import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntities,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminNotificationListParams>,
  res: ArcangelResponse<HttpTypes.AdminNotificationListResponse>
) => {
  const { data: notifications, metadata } = await refetchEntities({
    entity: "notification",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  res.json({
    notifications,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
