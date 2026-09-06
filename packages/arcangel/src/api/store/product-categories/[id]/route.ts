import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { StoreProductCategoryResponse } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"
import { StoreProductCategoryParamsType } from "../validators"

export const GET = async (
  req: AuthenticatedArcangelRequest<StoreProductCategoryParamsType>,
  res: ArcangelResponse<StoreProductCategoryResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: category } = await query.graph(
    {
      entity: "product_category",
      filters: { id: req.params.id, ...req.filterableFields },
      fields: req.queryConfig.fields,
    },
    {
      locale: req.locale,
    }
  )

  if (!category) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product category with id: ${req.params.id} was not found`
    )
  }

  res.json({ product_category: category[0] })
}
