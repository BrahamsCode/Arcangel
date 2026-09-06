import {
  deleteProductTagsWorkflow,
  updateProductTagsWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntity,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import { ArcangelError } from "@arcangel/framework/utils"

export const GET = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminProductTagParams
  >,
  res: ArcangelResponse<HttpTypes.AdminProductTagResponse>
) => {
  const productTag = await refetchEntity({
    entity: "product_tag",
    idOrFilter: req.params.id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ product_tag: productTag })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateProductTag,
    HttpTypes.AdminProductTagParams
  >,
  res: ArcangelResponse<HttpTypes.AdminProductTagResponse>
) => {
  const existingProductTag = await refetchEntity({
    entity: "product_tag",
    idOrFilter: req.params.id,
    scope: req.scope,
    fields: ["id"],
  })

  if (!existingProductTag) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product tag with id "${req.params.id}" not found`
    )
  }

  const { result } = await updateProductTagsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const productTag = await refetchEntity({
    entity: "product_tag",
    idOrFilter: result[0].id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ product_tag: productTag })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminProductTagDeleteResponse>
) => {
  const id = req.params.id

  await deleteProductTagsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "product_tag",
    deleted: true,
  })
}
