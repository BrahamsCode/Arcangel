import {
  deleteApiKeysWorkflow,
  updateApiKeysWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

import { refetchApiKey } from "../helpers"
import { ArcangelError } from "@arcangel/framework/utils"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminGetApiKeyParams>,
  res: ArcangelResponse<HttpTypes.AdminApiKeyResponse>
) => {
  const apiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!apiKey) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `API Key with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ api_key: apiKey })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateApiKey,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.AdminApiKeyResponse>
) => {
  await updateApiKeysWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const apiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ api_key: apiKey })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminApiKeyDeleteResponse>
) => {
  const id = req.params.id

  await deleteApiKeysWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "api_key",
    deleted: true,
  })
}
