import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.StoreCollectionResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: collections } = await query.graph(
    {
      entity: "product_collection",
      filters: { id: req.params.id },
      fields: req.queryConfig.fields,
    },
    {
      locale: req.locale,
    }
  )

  const collection = collections[0]
  if (!collection) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Collection with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ collection: collection })
}
