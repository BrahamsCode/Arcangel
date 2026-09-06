import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
  refetchEntity,
} from "@arcangel/framework/http"
import { ArcangelError } from "@arcangel/framework/utils"
import { AdminClaimResponse, HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<{}, HttpTypes.SelectParams>,
  res: ArcangelResponse<AdminClaimResponse>
) => {
  const claim = await refetchEntity({
    entity: "order_claim",
    idOrFilter: req.params.id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  if (!claim) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Claim with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ claim })
}
