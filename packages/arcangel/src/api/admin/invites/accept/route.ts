import { acceptInviteWorkflow } from "@arcangel/core-flows"
import { HttpTypes, InviteWorkflow } from "@arcangel/framework/types"
import { ArcangelError } from "@arcangel/framework/utils"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminAcceptInvite,
    HttpTypes.AdminGetInviteAcceptParams
  >,
  res: ArcangelResponse<HttpTypes.AdminAcceptInviteResponse>
) => {
  if (req.auth_context.actor_id) {
    throw new ArcangelError(
      ArcangelError.Types.INVALID_DATA,
      "The user is already authenticated and cannot accept an invite."
    )
  }

  const input = {
    invite_token: req.filterableFields.token as string,
    auth_identity_id: req.auth_context.auth_identity_id,
    user: req.validatedBody,
  } as InviteWorkflow.AcceptInviteWorkflowInputDTO

  let users

  try {
    const { result } = await acceptInviteWorkflow(req.scope).run({ input })
    users = result
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  res.status(200).json({ user: users[0] })
}

export const AUTHENTICATE = false
