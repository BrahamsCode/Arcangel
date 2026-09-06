import {
  deleteCustomerGroupsWorkflow,
  updateCustomerGroupsWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

import { ArcangelError } from "@arcangel/framework/utils"
import { refetchCustomerGroup } from "../helpers"
import { HttpTypes } from "@arcangel/framework/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.AdminCustomerGroupResponse>
) => {
  const customerGroup = await refetchCustomerGroup(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!customerGroup) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Customer group with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ customer_group: customerGroup })
}

export const POST = async (
  req: AuthenticatedArcangelRequest<
    HttpTypes.AdminUpdateCustomerGroup,
    HttpTypes.SelectParams
  >,
  res: ArcangelResponse<HttpTypes.AdminCustomerGroupResponse>
) => {
  const existingCustomerGroup = await refetchCustomerGroup(
    req.params.id,
    req.scope,
    ["id"]
  )
  if (!existingCustomerGroup) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Customer group with id "${req.params.id}" not found`
    )
  }

  await updateCustomerGroupsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const customerGroup = await refetchCustomerGroup(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ customer_group: customerGroup })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminCustomerGroupDeleteResponse>
) => {
  const id = req.params.id
  const deleteCustomerGroups = deleteCustomerGroupsWorkflow(req.scope)

  await deleteCustomerGroups.run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "customer_group",
    deleted: true,
  })
}
