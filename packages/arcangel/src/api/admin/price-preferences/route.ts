import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntities,
  refetchEntity,
} from "@arcangel/framework/http"
import { createPricePreferencesWorkflow } from "@arcangel/core-flows"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminPricePreferenceListParams>,
  res: ArcangelResponse<HttpTypes.AdminPricePreferenceListResponse>
) => {
  const { data: price_preferences, metadata } = await refetchEntities({
    entity: "price_preference",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  res.json({
    price_preferences: price_preferences,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminCreatePricePreference,
    HttpTypes.AdminGetPricePreferenceParams
  >,
  res: ArcangelResponse<HttpTypes.AdminPricePreferenceResponse>
) => {
  const workflow = createPricePreferencesWorkflow(req.scope)
  const { result } = await workflow.run({
    input: [req.validatedBody],
  })

  const price_preference = await refetchEntity({
    entity: "price_preference",
    idOrFilter: result[0].id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ price_preference })
}
