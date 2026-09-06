import {
  ContainerRegistrationKeys,
  ArcangelError,
  ArcangelErrorTypes,
} from "@arcangel/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelNextFunction,
  ArcangelResponse,
} from "../types"

export async function setSecretApiKeyContext(
  req: AuthenticatedArcangelRequest,
  _: ArcangelResponse,
  next: ArcangelNextFunction
) {
  const shouldSkip = req.auth_context?.actor_type !== "api-key"
  if (shouldSkip) {
    return next()
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const {
    data: [apiKey],
  } = await query.graph(
    {
      entity: "api_key",
      fields: ["created_by"],
      filters: {
        id: req.auth_context.actor_id,
      },
      withDeleted: true,
    },
    {
      cache: {
        enable: true,
      },
    }
  )

  if (!apiKey) {
    throw new ArcangelError(
      ArcangelErrorTypes.NOT_FOUND,
      `API key with id ${req.auth_context.actor_id} not found`
    )
  }

  req.secret_key_context = {
    created_by: apiKey.created_by,
  }
  next()
}
