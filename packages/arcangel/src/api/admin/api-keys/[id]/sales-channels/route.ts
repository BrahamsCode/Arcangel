import { linkSalesChannelsToApiKeyWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import { ApiKeyType, ArcangelError } from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { refetchApiKey } from "../../helpers"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminBatchLink,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.AdminApiKeyResponse>
) => {
  const { add, remove } = req.validatedBody
  const apiKey = await refetchApiKey(req.params.id, req.scope, ["id", "type"])

  if (apiKey.type !== ApiKeyType.PUBLISHABLE) {
    throw new ArcangelError(
      ArcangelError.Types.INVALID_DATA,
      "Sales channels can only be associated with publishable API keys"
    )
  }

  await linkSalesChannelsToApiKeyWorkflow(req.scope).run({
    input: {
      id: req.params.id,
      add,
      remove,
    },
  })

  const updatedApiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ api_key: updatedApiKey })
}
