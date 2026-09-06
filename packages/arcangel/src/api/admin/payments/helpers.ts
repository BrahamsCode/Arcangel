import { ArcangelContainer } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"

export const refetchPayment = async (
  paymentId: string,
  scope: ArcangelContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "payment",
    variables: {
      filters: { id: paymentId },
    },
    fields: fields,
  })

  const payments = await remoteQuery(queryObject)
  return payments[0]
}
