import {
  assignUserRolesWorkflow,
  removeUserRolesWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"
import { HttpTypes } from "@arcangel/types"

/**
 * @ignore
 * @featureFlag rbac
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminGetUserRolesParams>,
  res: ArcangelResponse
) => {
  const userId = req.params.id
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: links, metadata } = await query.graph({
    entity: "user_rbac_role",
    fields: req.queryConfig?.fields,
    filters: { ...req.filterableFields, user_id: userId },
    pagination: req.queryConfig?.pagination || {},
  })

  const roles = links.map((link: any) => link.rbac_role)

  res.status(200).json({
    roles,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 0,
  })
}

/**
 * @ignore
 * @featureFlag rbac
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminAssignUserRoles
  >,
  res: ArcangelResponse
) => {
  const userId = req.params.id
  const { roles } = req.validatedBody
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const {
    data: [user],
  } = await query.graph({
    entity: "user",
    fields: ["id"],
    filters: { id: userId },
  })

  if (!user) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `User with id "${userId}" not found`
    )
  }

  await assignUserRolesWorkflow(req.scope).run({
    input: {
      actor_id: req.auth_context.actor_id,
      actor: req.auth_context.actor_type,
      user_id: userId,
      role_ids: roles,
    },
  })

  const { data: links } = await query.graph({
    entity: "user_rbac_role",
    fields: ["rbac_role.*"],
    filters: { user_id: userId },
  })

  const userRoles = links.map((link: any) => link.rbac_role)

  res.status(200).json({ roles: userRoles })
}

/**
 * @ignore
 * @featureFlag rbac
 */
export const DELETE = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminRemoveUserRoles>,
  res: ArcangelResponse
) => {
  const userId = req.params.id
  const { roles } = req.validatedBody
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const {
    data: [user],
  } = await query.graph({
    entity: "user",
    fields: ["id"],
    filters: { id: userId },
  })

  if (!user) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `User with id "${userId}" not found`
    )
  }

  await removeUserRolesWorkflow(req.scope).run({
    input: {
      actor_id: req.auth_context.actor_id,
      actor: req.auth_context.actor_type,
      user_id: userId,
      role_ids: roles,
    },
  })

  res.status(200).json({
    ids: roles,
    object: "user_role",
    deleted: true,
  })
}
