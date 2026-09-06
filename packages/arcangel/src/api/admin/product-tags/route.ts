import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntities,
  refetchEntity,
} from "@arcangel/framework/http"

import { createProductTagsWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminProductTagListParams>,
  res: ArcangelResponse<HttpTypes.AdminProductTagListResponse>
) => {
  const { data: product_tags, metadata } = await refetchEntities({
    entity: "product_tag",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  res.json({
    product_tags: product_tags,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminCreateProductTag,
    HttpTypes.AdminProductTagParams
  >,
  res: ArcangelResponse<HttpTypes.AdminProductTagResponse>
) => {
  const input = [req.validatedBody]

  const { result } = await createProductTagsWorkflow(req.scope).run({
    input: { product_tags: input },
  })

  const productTag = await refetchEntity({
    entity: "product_tag",
    idOrFilter: result[0].id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ product_tag: productTag })
}
