import { reindexSearchIndexesWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { ArcangelError, Modules } from "@arcangel/framework/utils"

/**
 * Rebuild a search index from its seed.
 */
export const POST = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminSearchIndexReindexResponse>
) => {
  const searchModule = req.scope.resolve(Modules.SEARCH, {
    allowUnregistered: true,
  })

  if (!searchModule) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      "The Search Module is not enabled"
    )
  }

  const { transaction } = await reindexSearchIndexesWorkflow(req.scope).run({
    input: {
      index: req.params.id,
    },
  })

  res.status(202).json({
    job_id: transaction.transactionId,
    indexes: [req.params.id],
  })
}
