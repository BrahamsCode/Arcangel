import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import {
  AuthenticationInput,
  IAuthModuleService,
} from "@arcangel/framework/types"
import { ArcangelError, Modules } from "@arcangel/framework/utils"
import { generateJwtTokenWithChecks } from "../../../utils/generate-jwt-token"

export const GET = async (req: ArcangelRequest, res: ArcangelResponse) => {
  const { actor_type, auth_provider } = req.params
  const service: IAuthModuleService = req.scope.resolve(Modules.AUTH)

  const authData = {
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
    protocol: req.protocol,
  } as AuthenticationInput

  const { success, error, authIdentity, mfaChallenge } =
    await service.validateCallback(auth_provider, authData)

  if (success && authIdentity) {
    const result = await generateJwtTokenWithChecks(req.scope, {
      authIdentity,
      mfaChallenge,
      actorType: actor_type,
      authProvider: auth_provider,
    })

    return res.json(result)
  }

  throw new ArcangelError(
    ArcangelError.Types.UNAUTHORIZED,
    error || "Authentication failed"
  )
}

export const POST = async (req: ArcangelRequest, res: ArcangelResponse) => {
  await GET(req, res)
}
