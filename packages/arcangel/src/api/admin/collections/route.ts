import { createCollectionsWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { AdditionalData, HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import { refetchCollection } from "./helpers"
import { AdminCreateCollectionType } from "./validators"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminCollectionListParams>,
  res: ArcangelResponse<HttpTypes.AdminCollectionListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "product_collection",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: collections, metadata } = await remoteQuery(query)

  res.json({
    collections,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    AdminCreateCollectionType & AdditionalData,
    HttpTypes.AdminCollectionParams
  >,
  res: ArcangelResponse<HttpTypes.AdminCollectionResponse>
) => {
  const { additional_data, ...rest } = req.validatedBody

  const { result } = await createCollectionsWorkflow(req.scope).run({
    input: { collections: [rest], additional_data },
  })

  const collection = await refetchCollection(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ collection })
}
