import { exportOrdersWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

/**
 * @since 2.12.3
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<{}, HttpTypes.AdminOrderFilters>,
  res: ArcangelResponse<HttpTypes.AdminExportOrderResponse>
) => {
  const selectFields = req.queryConfig.fields ?? []
  const input = { select: selectFields, filter: req.filterableFields }

  const { transaction } = await exportOrdersWorkflow(req.scope).run({
    input,
  })

  res.status(202).json({ transaction_id: transaction.transactionId })
}
