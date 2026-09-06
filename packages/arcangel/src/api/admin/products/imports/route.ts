import {
  ArcangelResponse,
  AuthenticatedArcangelRequest,
} from "@arcangel/framework/http"
import type { HttpTypes } from "@arcangel/framework/types"
import type { AdminImportProductsType } from "../validators"
import { importProductsAsChunksWorkflow } from "@arcangel/core-flows"

/**
 * @since 2.8.5
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<AdminImportProductsType>,
  res: ArcangelResponse<HttpTypes.AdminImportProductResponse>
) => {
  const { result, transaction } = await importProductsAsChunksWorkflow(
    req.scope
  ).run({
    input: {
      filename: req.validatedBody.originalname,
      fileKey: req.validatedBody.file_key,
    },
  })

  res
    .status(202)
    .json({ transaction_id: transaction.transactionId, summary: result })
}
