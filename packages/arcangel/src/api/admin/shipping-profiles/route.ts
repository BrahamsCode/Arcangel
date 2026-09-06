import { createShippingProfilesWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { refetchShippingProfile } from "./helpers"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminCreateShippingProfile,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.AdminShippingProfileResponse>
) => {
  const shippingProfilePayload = req.validatedBody

  const { result } = await createShippingProfilesWorkflow(req.scope).run({
    input: { data: [shippingProfilePayload] },
  })

  const shippingProfile = await refetchShippingProfile(
    result?.[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ shipping_profile: shippingProfile })
}

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminShippingProfileListParams>,
  res: ArcangelResponse<HttpTypes.AdminShippingProfileListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "shipping_profiles",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: shippingProfiles, metadata } = await remoteQuery(query)

  res.status(200).json({
    shipping_profiles: shippingProfiles,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
