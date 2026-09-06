import {
  ContainerRegistrationKeys,
  ArcangelError,
} from "@arcangel/framework/utils"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"

import {
  deleteInventoryLevelsWorkflow,
  updateInventoryLevelsWorkflow,
} from "@arcangel/core-flows"
import { HttpTypes } from "@arcangel/framework/types"
import { refetchInventoryItem } from "../../../helpers"

export const DELETE = async (
  req: ArcangelRequest<{}, HttpTypes.AdminGetInventoryLocationLevelParams>,
  res: ArcangelResponse<HttpTypes.AdminInventoryLevelDeleteResponse>
) => {
  const { id, location_id } = req.params

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const result = await query.graph({
    entity: "inventory_level",
    filters: { inventory_item_id: id, location_id },
    fields: ["id", "reserved_quantity"],
  })

  if (!result.data.length) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Inventory Level for Item ${id} at Location ${location_id} not found`
    )
  }

  const { id: levelId, reserved_quantity: reservedQuantity } = result.data[0]

  if (reservedQuantity > 0) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_ALLOWED,
      `Cannot remove Inventory Level ${id} at Location ${location_id} because there are reservations at location`
    )
  }

  const deleteInventoryLevelWorkflow = deleteInventoryLevelsWorkflow(req.scope)

  await deleteInventoryLevelWorkflow.run({
    input: {
      id: [levelId],
    },
  })

  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    id: levelId,
    object: "inventory-level",
    deleted: true,
    parent: inventoryItem,
  })
}

export const POST = async (
  req: ArcangelRequest<
    HttpTypes.AdminUpdateInventoryLevel,
    HttpTypes.AdminGetInventoryLocationLevelParams
  >,
  res: ArcangelResponse<HttpTypes.AdminInventoryItemResponse>
) => {
  const { id, location_id } = req.params
  await updateInventoryLevelsWorkflow(req.scope).run({
    input: {
      updates: [{ ...req.validatedBody, inventory_item_id: id, location_id }],
    },
  })

  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    inventory_item: inventoryItem,
  })
}
