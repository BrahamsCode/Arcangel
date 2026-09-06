import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes, QueryContextType } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
  QueryContext,
} from "@arcangel/framework/utils"
import {
  prepareInventoryQuantityFields,
  wrapVariantsWithInventoryQuantityForSalesChannel,
} from "../../../utils/middlewares"
import { StoreRequestWithContext } from "../../types"
import { wrapVariantsWithTaxPrices } from "../helpers"
import { StoreProductVariantParamsType } from "../validators"

type StoreVariantRetrieveRequest =
  StoreRequestWithContext<HttpTypes.StoreProductVariantParams> &
    AuthenticatedArcangelRequest<StoreProductVariantParamsType>

/**
 * @since 2.11.2
 */
export const GET = async (
  req: StoreVariantRetrieveRequest,
  res: ArcangelResponse<HttpTypes.StoreProductVariantResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { fields, withInventoryQuantity } = prepareInventoryQuantityFields(
    req.queryConfig.fields
  )
  req.queryConfig.fields = fields

  const context: QueryContextType = {}

  if (req.pricingContext) {
    context["calculated_price"] = QueryContext(req.pricingContext)
  }

  const { data: variants = [] } = await query.graph(
    {
      entity: "variant",
      filters: {
        ...req.filterableFields,
        id: req.params.id,
      },
      fields: req.queryConfig.fields,
      context,
    },
    {
      locale: req.locale,
    }
  )

  const variant = variants[0]

  if (!variant) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product variant with id: ${req.params.id} was not found`
    )
  }

  if (withInventoryQuantity) {
    await wrapVariantsWithInventoryQuantityForSalesChannel(req, [variant])
  }

  await wrapVariantsWithTaxPrices(req, [variant])

  res.json({ variant })
}
