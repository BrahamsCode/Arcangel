import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { AdminCreateViewConfigurationType } from "./validators"
import { HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"
import { createViewConfigurationWorkflow } from "@arcangel/core-flows"

/**
 * @since 2.10.3
 * @featureFlag view_configurations
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminGetViewConfigurationsParams>,
  res: ArcangelResponse<HttpTypes.AdminViewConfigurationListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const filters = {
    ...req.filterableFields,
    entity: req.params.entity,
    $or: [{ user_id: req.auth_context.actor_id }, { is_system_default: true }],
  }

  const { data: viewConfigurations, metadata } = await query.graph({
    entity: "view_configuration",
    fields: req.queryConfig.fields,
    filters,
    pagination: req.queryConfig.pagination,
  })

  res.json({
    view_configurations: viewConfigurations,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 20,
  })
}

/**
 * @since 2.10.3
 * @featureFlag view_configurations
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<AdminCreateViewConfigurationType>,
  res: ArcangelResponse<HttpTypes.AdminViewConfigurationResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  // Validate: name is required unless creating a system default
  if (!req.body.is_system_default && !req.body.name) {
    throw new ArcangelError(
      ArcangelError.Types.INVALID_DATA,
      "Name is required unless creating a system default view"
    )
  }

  const input = {
    ...req.body,
    entity: req.params.entity,
    user_id: req.body.is_system_default ? null : req.auth_context.actor_id,
  }

  const { result } = await createViewConfigurationWorkflow(req.scope).run({
    input,
  })

  const {
    data: [viewConfiguration],
  } = await query.graph({
    entity: "view_configuration",
    fields: req.queryConfig.fields,
    filters: { id: result.id },
  })

  return res.json({ view_configuration: viewConfiguration })
}
