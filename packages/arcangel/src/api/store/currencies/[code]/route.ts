import {
  ContainerRegistrationKeys,
  ArcangelError,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: ArcangelRequest<HttpTypes.StoreGetCurrencyParams>,
  res: ArcangelResponse<HttpTypes.StoreCurrencyResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { filters: { code: req.params.code } }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "currency",
    variables,
    fields: req.queryConfig.fields,
  })

  const [currency] = await remoteQuery(queryObject)
  if (!currency) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Currency with code: ${req.params.code} was not found`
    )
  }

  res.status(200).json({ currency })
}
