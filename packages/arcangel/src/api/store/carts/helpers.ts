import { ArcangelContainer } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"

export const refetchCart = async (
  id: string,
  scope: ArcangelContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "cart",
    variables: { filters: { id } },
    fields,
  })

  const [cart] = await remoteQuery(queryObject)

  if (!cart) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Cart with id '${id}' not found`
    )
  }

  return cart
}
