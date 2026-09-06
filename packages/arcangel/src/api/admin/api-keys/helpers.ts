import { ArcangelContainer } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"

export const refetchApiKey = async (
  apiKeyId: string,
  scope: ArcangelContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "api_key",
    variables: {
      filters: { id: apiKeyId },
    },
    fields: fields,
  })

  const apiKeys = await remoteQuery(queryObject)
  return apiKeys[0]
}
