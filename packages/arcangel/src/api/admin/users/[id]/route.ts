import {
  removeUserAccountWorkflow,
  updateUsersWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes, UpdateUserDTO } from "@arcangel/framework/types"

import {
  ContainerRegistrationKeys,
  ArcangelError,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import { refetchUser } from "../helpers"

// Get user
export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminUserParams>,
  res: ArcangelResponse<HttpTypes.AdminUserResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const { id } = req.params

  const query = remoteQueryObjectFromString({
    entryPoint: "user",
    variables: { id },
    fields: req.queryConfig.fields,
  })

  const [user] = await remoteQuery(query)
  if (!user) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `User with id: ${id} was not found`
    )
  }

  res.status(200).json({ user })
}

// update user
export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateUser,
    HttpTypes.AdminUserParams
  >,
  res: ArcangelResponse<HttpTypes.AdminUserResponse>
) => {
  const workflow = updateUsersWorkflow(req.scope)

  const input = {
    updates: [
      {
        id: req.params.id,
        ...req.validatedBody,
      } as UpdateUserDTO,
    ],
  }

  await workflow.run({ input })

  const user = await refetchUser(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ user })
}

// delete user
export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminUserDeleteResponse>
) => {
  const { id } = req.params
  const { actor_id } = req.auth_context

  if (actor_id === id) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_ALLOWED,
      "A user cannot delete itself"
    )
  }

  const workflow = removeUserAccountWorkflow(req.scope)

  await workflow.run({
    input: { userId: id },
  })

  res.status(200).json({
    id,
    object: "user",
    deleted: true,
  })
}
