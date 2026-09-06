import {
  deleteProductOptionValuesWorkflow,
  updateProductOptionValuesWorkflow,
} from "@arcangel/core-flows"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"

const retrieveProductOptionValue = async (
  req: AuthenticatedArcangelRequest<unknown, unknown>,
  fields?: string[]
): Promise<HttpTypes.AdminProductOptionValue> => {
  // Ensure the value belongs to the option
  const { value_id: valueId, id: optionId } = req.params
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const {
    data: [product_option_value],
  } = await query.graph({
    entity: "product_option_value",
    filters: { id: valueId, option_id: optionId },
    fields: fields ?? ["id"],
  })

  if (!product_option_value) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Product option value with id "${valueId}" was not found for option with id "${optionId}"`
    )
  }

  return product_option_value
}

/**
 * @since 2.16.0
 */
export const GET = async (
  req: AuthenticatedArcangelRequest<{}, HttpTypes.SelectParams>,
  res: ArcangelResponse<HttpTypes.AdminProductOptionValueResponse>
) => {
  const product_option_value = await retrieveProductOptionValue(
    req,
    req.queryConfig.fields
  )

  res.status(200).json({ product_option_value })
}

/**
 * @since 2.17.0
 */
export const POST = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminUpdateProductOptionValue>,
  res: ArcangelResponse<HttpTypes.AdminProductOptionValueResponse>
) => {
  // Ensure the value belongs to the option in the route before updating.
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { value_id: valueId } = req.params

  await retrieveProductOptionValue(req)

  await updateProductOptionValuesWorkflow(req.scope).run({
    input: {
      id: req.params.value_id,
      update: req.validatedBody,
    },
  })

  const {
    data: [updatedProductOptionValue],
  } = await query.graph({
    entity: "product_option_value",
    filters: { id: valueId },
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ product_option_value: updatedProductOptionValue })
}

/**
 * @since 2.17.0
 */
export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse<HttpTypes.AdminProductOptionValueDeleteResponse>
) => {
  const { value_id: valueId } = req.params

  // Ensure the value belongs to the option in the route before deleting.
  await retrieveProductOptionValue(req)

  await deleteProductOptionValuesWorkflow(req.scope).run({
    input: { ids: [valueId] },
  })

  res.status(200).json({
    id: valueId,
    object: "product_option_value",
    deleted: true,
  })
}
