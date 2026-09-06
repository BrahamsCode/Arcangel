import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes, QueryContextType } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  QueryContext,
} from "@arcangel/framework/utils"
import {
  prepareInventoryQuantityFields,
  wrapVariantsWithInventoryQuantityForSalesChannel,
} from "../../utils/middlewares"
import { StoreRequestWithContext } from "../types"
import { wrapVariantsWithTaxPrices } from "./helpers"

type StoreVariantListRequest<T = HttpTypes.StoreProductVariantParams> =
  StoreRequestWithContext<T> & AuthenticatedArcangelRequest<T>

/**
 * @since 2.11.2
 */
export const GET = async (
  req: StoreVariantListRequest,
  res: ArcangelResponse<HttpTypes.StoreProductVariantListResponse>
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

  const { data: variants = [], metadata } = await query.graph(
    {
      entity: "variant",
      fields: req.queryConfig.fields,
      filters: req.filterableFields,
      pagination: req.queryConfig.pagination,
      context,
    },
    {
      cache: {
        enable: true,
      },
      locale: req.locale,
    }
  )

  if (withInventoryQuantity) {
    await wrapVariantsWithInventoryQuantityForSalesChannel(req, variants)
  }

  await wrapVariantsWithTaxPrices(req, variants)

  res.json({
    variants,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 0,
  })
}
