import { ArcangelContainer } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  isPresent,
  ArcangelError,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import { AdminPriceListRemoteQueryDTO } from "../types"
import { buildPriceListResponse } from "./"

export async function getPriceList({
  id,
  container,
  remoteQueryFields,
  apiFields,
}: {
  id: string
  container: ArcangelContainer
  remoteQueryFields: string[]
  apiFields: string[]
}): Promise<AdminPriceListRemoteQueryDTO> {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "price_list",
    fields: remoteQueryFields,
    variables: { id },
  })

  const priceLists = await remoteQuery(queryObject)
  const [sanitizedPriceList] = buildPriceListResponse(priceLists, apiFields)

  if (!isPresent(sanitizedPriceList)) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Price list with id: ${id} was not found`
    )
  }

  return sanitizedPriceList
}
