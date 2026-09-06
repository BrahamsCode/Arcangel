import {
  AuthenticatedArcangelRequest,
  ArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { IAuthModuleService } from "@arcangel/framework/types"
import { Modules } from "@arcangel/framework/utils"
import { VerificationConfirmRequestType } from "../../validators"

/**
 * @since 2.16.0
 */
export const POST = async (
  req:
    | ArcangelRequest<VerificationConfirmRequestType>
    | AuthenticatedArcangelRequest<VerificationConfirmRequestType>,
  res: ArcangelResponse
) => {
  const { code, code_provider } = req.validatedBody

  const authService = req.scope.resolve<IAuthModuleService>(Modules.AUTH)
  const result = await authService.confirmAuthVerification({
    auth_identity_id:
      "auth_context" in req ? req.auth_context.auth_identity_id : undefined,
    code,
    code_provider,
  })

  return res.status(200).json({
    entity_id: result.entity_id,
    entity_type: result.entity_type,
    code_provider: result.code_provider,
    verified_at: result.verified_at,
  })
}
