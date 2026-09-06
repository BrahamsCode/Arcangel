import { batchImageVariantsWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

/**
 * @since 2.11.2
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminBatchImageVariantRequest>,
  res: ArcangelResponse<HttpTypes.AdminBatchImageVariantResponse>
) => {
  const imageId = req.params.image_id

  const { result } = await batchImageVariantsWorkflow(req.scope).run({
    input: {
      image_id: imageId,
      add: req.validatedBody.add,
      remove: req.validatedBody.remove,
    },
  })

  res.status(200).json({
    added: result.added,
    removed: result.removed,
  })
}
