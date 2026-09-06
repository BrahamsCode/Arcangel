import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import {
  ContainerRegistrationKeys,
  ArcangelError,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import { HttpTypes } from "@arcangel/framework/types"

// TODO: Add more fields to provider, such as default name and maybe logo.
export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.StorePaymentProviderFilters>,
  res: ArcangelResponse<HttpTypes.StorePaymentProviderListResponse>
) => {
  if (!req.filterableFields.region_id) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_ALLOWED,
      "You must provide the region_id to list payment providers"
    )
  }

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region_payment_provider",
    variables: {
      filters: {
        region_id: req.filterableFields.region_id,
      },
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields.map((f) => `payment_provider.${f}`),
  })

  const { rows: regionPaymentProvidersRelation, metadata } = await remoteQuery(
    queryObject
  )

  const paymentProviders = regionPaymentProvidersRelation.map(
    (relation) => relation.payment_provider
  )

  res.json({
    payment_providers: paymentProviders,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
