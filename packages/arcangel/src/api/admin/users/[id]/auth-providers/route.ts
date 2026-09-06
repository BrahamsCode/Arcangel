import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

/**
 * @since 2.20.0
 */
export const GET = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminUserAuthProvidersResponse>
) => {
  const { id } = req.params

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: authIdentities } = await query.graph({
    entity: "auth_identity",
    fields: ["provider_identities.provider"],
    filters: {
      app_metadata: {
        user_id: id,
      },
    },
  })

  const providers = authIdentities.flatMap(
    (authIdentity) =>
      authIdentity.provider_identities?.map(
        (providerIdentity) => providerIdentity.provider
      ) ?? []
  )

  res.status(200).json({ providers })
}
