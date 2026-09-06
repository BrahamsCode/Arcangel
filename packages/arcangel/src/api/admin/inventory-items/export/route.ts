import { exportInventoryItemsWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

export const POST = async (
  req: AuthenticatedArcangelRequest<{}, HttpTypes.AdminInventoryItemExportParams>,
  res: ArcangelResponse<HttpTypes.AdminExportInventoryItemResponse>
) => {
  const input = {
    select: req.queryConfig.fields ?? [],
    filter: req.filterableFields,
  }

  const { transaction } = await exportInventoryItemsWorkflow(req.scope).run({
    input,
  })

  res.status(202).json({ transaction_id: transaction.transactionId })
}
