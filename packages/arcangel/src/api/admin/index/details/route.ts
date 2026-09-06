import { AuthenticatedArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/framework/types"
import { Modules } from "@arcangel/framework/utils"

/**
 * Get the index information for all entities that are indexed and their sync state
 * 
 * @since 2.11.2
 * @featureFlag index
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<void>,
  res: ArcangelResponse<HttpTypes.AdminIndexDetailsResponse>
) => {
  const indexModuleService = req.scope.resolve(Modules.INDEX)
  const indexInfo = await indexModuleService.getInfo()
  res.json({
    metadata: indexInfo,
  })
}
