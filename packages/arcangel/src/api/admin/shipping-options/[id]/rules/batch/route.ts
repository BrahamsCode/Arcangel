import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { BatchMethodRequest, HttpTypes } from "@arcangel/framework/types"
import { refetchBatchRules } from "../../../helpers"
import { batchShippingOptionRulesWorkflow } from "@arcangel/core-flows"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    BatchMethodRequest<
      HttpTypes.AdminCreateShippingOptionRule,
      HttpTypes.AdminUpdateShippingOptionRule
    >,
    HttpTypes.AdminGetShippingOptionRuleParams
  >,
  res: ArcangelResponse<HttpTypes.AdminUpdateShippingOptionRulesResponse>
) => {
  const id = req.params.id
  const { result } = await batchShippingOptionRulesWorkflow(req.scope).run({
    input: {
      create: req.validatedBody.create?.map((c) => ({
        ...c,
        shipping_option_id: id,
      })),
      update: req.validatedBody.update,
      delete: req.validatedBody.delete,
    },
  })

  const batchResults = await refetchBatchRules(
    result,
    req.scope,
    req.queryConfig.fields
  )

  res
    .status(200)
    .json(
      batchResults as unknown as HttpTypes.AdminUpdateShippingOptionRulesResponse
    )
}
