import { ArcangelContainer } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"

export const refetchCampaign = async (
  campaignId: string,
  scope: ArcangelContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "campaign",
    variables: {
      filters: { id: campaignId },
    },
    fields: fields,
  })

  const campaigns = await remoteQuery(queryObject)
  return campaigns[0]
}
