import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"

import { refreshInviteTokensWorkflow } from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import { refetchInvite } from "../../helpers"

export const POST = async (
  req: ArcangelRequest<{}, HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.AdminInviteResponse>
) => {
  const workflow = refreshInviteTokensWorkflow(req.scope)

  const input = {
    invite_ids: [req.params.id],
  }

  const { result } = await workflow.run({ input })
  const invite = await refetchInvite(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ invite })
}
