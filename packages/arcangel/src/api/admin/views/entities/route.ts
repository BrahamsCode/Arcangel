import { HttpTypes, SettingsTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { Modules } from "@arcangel/framework/utils"

/**
 * List all available entities that can be used for view configurations.
 * Entities are discovered from joiner configs (GraphQL schema).
 *
 * @since 2.10.3
 * @featureFlag view_configurations
 */
export const GET = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminEntityListResponse>
) => {
  const settingsService =
    req.scope.resolve<SettingsTypes.ISettingsModuleService>(Modules.SETTINGS)

  const entities = await settingsService.listDiscoverableEntities()

  entities.sort((a, b) => a.name.localeCompare(b.name))

  return res.json({
    entities,
  })
}
