import {
  ArcangelNextFunction,
  ArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { ConfigModule } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"
import { isAuthProviderAllowedForActor } from "./auth-methods-per-actor"

// Middleware to validate that a scope is associated with a provider
export const validateScopeProviderAssociation = () => {
  return async (
    req: ArcangelRequest,
    _: ArcangelResponse,
    next: ArcangelNextFunction
  ) => {
    const { actor_type, auth_provider } = req.params
    const config: ConfigModule = req.scope.resolve(
      ContainerRegistrationKeys.CONFIG_MODULE
    )

    if (!isAuthProviderAllowedForActor(config, actor_type, auth_provider)) {
      throw new ArcangelError(
        ArcangelError.Types.NOT_ALLOWED,
        `The actor type ${actor_type} is not allowed to use the auth provider ${auth_provider}`
      )
    }

    next()
  }
}
