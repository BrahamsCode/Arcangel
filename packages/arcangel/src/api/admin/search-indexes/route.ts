import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { Modules } from "@arcangel/framework/utils"

/**
 * List registered search indexes, their status, and the fields each stores.
 */
export const GET = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminSearchIndexListResponse>
) => {
  const searchModule = req.scope.resolve(Modules.SEARCH, {
    allowUnregistered: true,
  })

  if (!searchModule) {
    res.json({ search_indexes: [], enabled: false })
    return
  }

  const search_indexes = await searchModule.listIndexes()

  res.json({ search_indexes, enabled: true })
}
