import {
  deleteShippingProfileWorkflow,
  updateShippingProfilesWorkflow,
} from "@arcangel/core-flows"
import { HttpTypes, IFulfillmentModuleService } from "@arcangel/framework/types"
import { Modules } from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { refetchShippingProfile } from "../helpers"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminGetShippingProfileParams>,
  res: ArcangelResponse<HttpTypes.AdminShippingProfileResponse>
) => {
  const shippingProfile = await refetchShippingProfile(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ shipping_profile: shippingProfile })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminShippingProfileDeleteResponse>
) => {
  const { id } = req.params

  const fulfillmentModuleService = req.scope.resolve<IFulfillmentModuleService>(
    Modules.FULFILLMENT
  )

  // Test if exists
  await fulfillmentModuleService.retrieveShippingProfile(id)

  await deleteShippingProfileWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "shipping_profile",
    deleted: true,
  })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateShippingProfile,
    HttpTypes.AdminGetShippingProfileParams
  >,
  res: ArcangelResponse<HttpTypes.AdminShippingProfileResponse>
) => {
  const { id } = req.params

  await updateShippingProfilesWorkflow(req.scope).run({
    input: { selector: { id }, update: req.body },
  })

  const shippingProfile = await refetchShippingProfile(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    shipping_profile: shippingProfile,
  })
}
