import { requestVerificationWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { VerificationRequestType } from "../../validators"

/**
 * @since 2.16.0
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<VerificationRequestType>,
  res: ArcangelResponse
) => {
  const { entity_id, entity_type, code_provider, metadata } = req.validatedBody

  const { result } = await requestVerificationWorkflow(req.scope).run({
    input: {
      auth_identity_id: req.auth_context.auth_identity_id,
      entity_id,
      entity_type,
      code_provider,
      metadata,
    },
  })

  res.status(201).json({ verification: result })
}
