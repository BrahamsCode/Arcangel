import {
  deleteRegionsWorkflow,
  updateRegionsWorkflow,
} from "@arcangel/core-flows"
import { ArcangelError } from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { refetchRegion } from "../helpers"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminGetRegionParams
  >,
  res: ArcangelResponse<HttpTypes.AdminRegionResponse>
) => {
  const region = await refetchRegion(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!region) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Region with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ region })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateRegion,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.AdminRegionResponse>
) => {
  const existingRegion = await refetchRegion(req.params.id, req.scope, ["id"])
  if (!existingRegion) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Region with id "${req.params.id}" not found`
    )
  }

  const { result } = await updateRegionsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const region = await refetchRegion(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ region })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminRegionDeleteResponse>
) => {
  const id = req.params.id

  await deleteRegionsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "region",
    deleted: true,
  })
}
