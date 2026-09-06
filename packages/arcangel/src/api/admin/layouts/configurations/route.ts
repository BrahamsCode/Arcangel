import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

/**
 * @since 2.17.2
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminGetLayoutConfigurationsParams>,
  res: ArcangelResponse<HttpTypes.AdminLayoutConfigurationListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const filters = {
    ...req.filterableFields,
    $or: [{ user_id: req.auth_context.actor_id }, { is_system_default: true }],
  }

  const { data: layout_configurations, metadata } = await query.graph({
    entity: "layout_configuration",
    fields: req.queryConfig.fields,
    filters,
    pagination: req.queryConfig.pagination,
  })

  res.json({
    layout_configurations,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 20,
  })
}
