import { generateResetPasswordTokenWorkflow } from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"

/**
 * @since 2.20.0
 */
export const POST = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminUserResetPasswordTokenResponse>
) => {
  const { id } = req.params
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const {
    data: [user],
  } = await query.graph({
    entity: "user",
    fields: ["email"],
    filters: {
      id,
    },
  })

  if (!user) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `User with id: ${id} was not found`
    )
  }

  const { http } = req.scope.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  ).projectConfig

  const { result: token } = await generateResetPasswordTokenWorkflow(
    req.scope
  ).run({
    input: {
      entityId: user.email,
      actorType: "user",
      provider: "emailpass",
      secret: http.jwtSecret!,
      jwtOptions: http.jwtOptions,
    },
  })

  res.status(200).json({ token })
}
