import { transferCartCustomerWorkflowId } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"

import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { Modules } from "@arcangel/framework/utils"
import { AdditionalData } from "@arcangel/types"
import { refetchCart } from "../../helpers"

export const POST = async (
  req: AuthenticatedArcangelRequest<AdditionalData, HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.StoreCartResponse>
) => {
  const we = req.scope.resolve(Modules.WORKFLOW_ENGINE)

  await we.run(transferCartCustomerWorkflowId, {
    input: {
      id: req.params.id,
      customer_id: req.auth_context?.actor_id,
      additional_data: req.validatedBody.additional_data,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
