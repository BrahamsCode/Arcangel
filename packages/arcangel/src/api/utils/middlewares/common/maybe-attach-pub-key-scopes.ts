import { RemoteQueryFunction } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import { NextFunction } from "express"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"

/**
 * If a publishable key (PK) is passed in the header of the request, we attach
 * the IDs of resources within the scope of the key.
 *
 * @param req - request object
 * @param res - response object
 * @param next - next middleware call
 *
 * @throws if sales channel id is passed as a url or body param
 *         but that id is not in the scope defined by the PK from the header
 */
export async function maybeAttachPublishableKeyScopes(
  req: ArcangelRequest & { publishableApiKeyScopes: any },
  res: ArcangelResponse,
  next: NextFunction
) {
  const pubKey = req.get("x-publishable-api-key")

  if (pubKey) {
    const remoteQuery = req.scope.resolve<RemoteQueryFunction>(
      ContainerRegistrationKeys.REMOTE_QUERY
    )

    const queryObject = remoteQueryObjectFromString({
      entryPoint: "api_key",
      fields: ["sales_channels.id"],
      variables: {
        filters: { token: pubKey },
      },
    })

    const [apiKey] = await remoteQuery(queryObject)

    req.publishableApiKeyScopes = {
      sales_channel_ids: apiKey?.sales_channels.map((sc) => sc.id) ?? [],
    }
  }

  next()
}
