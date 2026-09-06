import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { StoreProductTypeResponse } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"

import { StoreProductTypeParamsType } from "../validators"

export const GET = async (
  req: AuthenticatedArcangelRequest<StoreProductTypeParamsType>,
  res: ArcangelResponse<StoreProductTypeResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data } = await query.graph(
    {
      entity: "product_type",
      filters: {
        id: req.params.id,
      },
      fields: req.queryConfig.fields,
    },
    {
      locale: req.locale,
    }
  )

  if (!data.length) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product type with id: ${req.params.id} was not found`
    )
  }

  const productType = data[0]

  res.json({ product_type: productType })
}
