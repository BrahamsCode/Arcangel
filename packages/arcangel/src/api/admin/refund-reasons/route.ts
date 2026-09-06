import { createRefundReasonsWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntities,
  refetchEntity,
} from "@arcangel/framework/http"
import {
  HttpTypes,
  PaginatedResponse,
  RefundReasonResponse,
  RefundReasonsResponse,
} from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.RefundReasonFilters>,
  res: ArcangelResponse<PaginatedResponse<RefundReasonsResponse>>
) => {
  const { data: refund_reasons, metadata } = await refetchEntities({
    entity: "refund_reasons",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  })

  res.json({
    refund_reasons,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminCreateRefundReason,
    HttpTypes.AdminRefundReasonParams
  >,
  res: ArcangelResponse<RefundReasonResponse>
) => {
  const {
    result: [refundReason],
  } = await createRefundReasonsWorkflow(req.scope).run({
    input: { data: [req.validatedBody] },
  })

  const refund_reason = await refetchEntity({
    entity: "refund_reason",
    idOrFilter: refundReason.id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ refund_reason })
}
