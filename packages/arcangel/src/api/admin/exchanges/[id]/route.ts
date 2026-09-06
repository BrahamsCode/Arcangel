import { HttpTypes } from "@arcangel/framework/types"
import { ArcangelError } from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntity,
} from "@arcangel/framework/http"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.AdminExchangeResponse>
) => {
  const exchange = await refetchEntity({
    entity: "order_exchange",
    idOrFilter: req.params.id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  if (!exchange) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Exchange with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ exchange })
}
