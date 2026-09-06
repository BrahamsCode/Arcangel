import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { StoreProductTagResponse } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"

import { StoreProductTagParamsType } from "../validators"

export const GET = async (
  req: AuthenticatedArcangelRequest<StoreProductTagParamsType>,
  res: ArcangelResponse<StoreProductTagResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data } = await query.graph(
    {
      entity: "product_tag",
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
      `Product tag with id: ${req.params.id} was not found`
    )
  }

  const productTag = data[0]

  res.json({ product_tag: productTag })
}
