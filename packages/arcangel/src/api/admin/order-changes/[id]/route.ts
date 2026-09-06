import { updateOrderChangeWorkflow } from "@arcangel/core-flows"
import { HttpTypes, RemoteQueryFunction } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

/**
 * @since 2.12.0
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateOrderChange,
    HttpTypes.AdminOrderChangesFilters
  >,
  res: ArcangelResponse<HttpTypes.AdminOrderChangeResponse>
) => {
  const { id } = req.params
  const { carry_over_promotions, internal_note } = req.validatedBody
  const query = req.scope.resolve<RemoteQueryFunction>(
    ContainerRegistrationKeys.QUERY
  )

  const workflow = updateOrderChangeWorkflow(req.scope)
  await workflow.run({
    input: {
      id,
      carry_over_promotions,
      internal_note,
    },
  })

  const result = await query.graph({
    entity: "order_change",
    filters: {
      ...req.filterableFields,
      id,
    },
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ order_change: result.data[0] })
}
