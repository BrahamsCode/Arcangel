import { createRegionsWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { refetchRegion } from "./helpers"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminRegionFilters>,
  res: ArcangelResponse<HttpTypes.AdminRegionListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: regions, metadata } = await remoteQuery(queryObject)

  res.json({
    regions,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminCreateRegion,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.AdminRegionResponse>
) => {
  const input = [req.validatedBody]

  const { result } = await createRegionsWorkflow(req.scope).run({
    input: { regions: input },
  })

  const region = await refetchRegion(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ region })
}
