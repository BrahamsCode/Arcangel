import { batchInventoryItemLevelsWorkflow } from "@arcangel/core-flows"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { HttpTypes } from "@arcangel/types"

export const POST = async (
  req: ArcangelRequest<HttpTypes.AdminBatchInventoryItemsLocationLevels>,
  res: ArcangelResponse<HttpTypes.AdminBatchInventoryItemsLocationLevelsResponse>
) => {
  const body = req.validatedBody

  const output = await batchInventoryItemLevelsWorkflow(req.scope).run({
    input: body,
  })

  res.json({
    created: output.result.created as HttpTypes.AdminInventoryLevel[],
    updated: output.result.updated as HttpTypes.AdminInventoryLevel[],
    deleted: output.result.deleted,
  })
}
