import { HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

/**
 * @since 2.16.0
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<{}, HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.StoreProductOptionResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data } = await query.graph({
    entity: "product_option",
    filters: {
      id: req.params.id,
    },
    fields: req.queryConfig.fields,
  })

  if (!data.length) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product option with id: ${req.params.id} was not found`
    )
  }

  res.json({ product_option: data[0] })
}
