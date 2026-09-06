import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import { remapKeysForProduct } from "../helpers"
import { exportProductsWorkflow } from "@arcangel/core-flows"

export const POST = async (
  req: AuthenticatedArcangelRequest<{}, HttpTypes.AdminProductExportParams>,
  res: ArcangelResponse<HttpTypes.AdminExportProductResponse>
) => {
  const selectFields = remapKeysForProduct(req.queryConfig.fields ?? [])
  const input = { select: selectFields, filter: req.filterableFields }

  const { transaction } = await exportProductsWorkflow(req.scope).run({
    input,
  })

  res.status(202).json({ transaction_id: transaction.transactionId })
}
