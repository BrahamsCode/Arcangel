import { ArcangelContainer } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"

export const refetchFulfillmentSet = async (
  fulfillmentSetId: string,
  scope: ArcangelContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "fulfillment_set",
    variables: {
      filters: { id: fulfillmentSetId },
    },
    fields: fields,
  })

  const fulfillmentSets = await remoteQuery(queryObject)
  return fulfillmentSets[0]
}
