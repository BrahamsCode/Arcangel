import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@arcangel/framework/utils"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"

import { createInventoryLevelsWorkflow } from "@arcangel/core-flows"
import { refetchInventoryItem } from "../../helpers"
import { HttpTypes } from "@arcangel/framework/types"

export const POST = async (
  req: ArcangelRequest<
    HttpTypes.AdminBatchCreateInventoryItemLocationLevels,
    HttpTypes.AdminGetInventoryLocationLevelParams
  >,
  res: ArcangelResponse<HttpTypes.AdminInventoryItemResponse>
) => {
  const { id } = req.params

  const workflow = createInventoryLevelsWorkflow(req.scope)
  await workflow.run({
    input: {
      inventory_levels: [
        {
          ...req.validatedBody,
          inventory_item_id: id,
        },
      ],
    },
  })

  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ inventory_item: inventoryItem })
}

export const GET = async (
  req: ArcangelRequest<HttpTypes.AdminInventoryLevelFilters>,
  res: ArcangelResponse<HttpTypes.AdminInventoryLevelListResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "inventory_levels",
    variables: {
      filters: { ...req.filterableFields, inventory_item_id: id },
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: inventory_levels, metadata } = await remoteQuery(query)

  res.status(200).json({
    inventory_levels,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
