import { convertDraftOrderWorkflow } from "@arcangel/core-flows"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"
import { HttpTypes } from "@arcangel/types"

export const POST = async (
  req: ArcangelRequest<HttpTypes.AdminDraftOrderParams>, 
  res: ArcangelResponse<HttpTypes.AdminOrderResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  await convertDraftOrderWorkflow(req.scope).run({
    input: {
      id: req.params.id,
    },
  })

  const result = await query.graph({
    entity: "orders",
    filters: { id: req.params.id },
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ order: result.data[0] as HttpTypes.AdminOrder })
}
