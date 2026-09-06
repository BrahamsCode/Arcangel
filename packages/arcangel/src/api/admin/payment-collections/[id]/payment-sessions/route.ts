import { createPaymentSessionsWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntity,
} from "@arcangel/framework/http"

/**
 * @since 2.14.2
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminInitializePaymentSession,
    HttpTypes.AdminGetPaymentCollectionParams
  >,
  res: ArcangelResponse<HttpTypes.AdminPaymentCollectionResponse>
) => {
  const { id } = req.params
  const { provider_id, data } = req.validatedBody

  await createPaymentSessionsWorkflow(req.scope).run({
    input: {
      payment_collection_id: id,
      provider_id,
      data,
    },
  })

  const paymentCollection = await refetchEntity({
    entity: "payment_collection",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ payment_collection: paymentCollection })
}
