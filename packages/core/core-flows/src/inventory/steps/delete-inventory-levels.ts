import type { IInventoryService } from "@arcangel/framework/types"
import { StepResponse, createStep } from "@arcangel/framework/workflows-sdk"

import { Modules } from "@arcangel/framework/utils"

/**
 * The IDs of inventory levels to delete.
 */
export type DeleteInventoryLevelsStepInput = string[]

export const deleteInventoryLevelsStepId = "delete-inventory-levels-step"
/**
 * This step deletes one or more inventory levels.
 */
export const deleteInventoryLevelsStep = createStep(
  deleteInventoryLevelsStepId,
  async (ids: DeleteInventoryLevelsStepInput, { container }) => {
    const service = container.resolve<IInventoryService>(Modules.INVENTORY)

    await service.softDeleteInventoryLevels(ids)

    return new StepResponse(void 0, ids)
  },
  async (prevLevelIds, { container }) => {
    if (!prevLevelIds?.length) {
      return
    }

    const service = container.resolve<IInventoryService>(Modules.INVENTORY)

    await service.restoreInventoryLevels(prevLevelIds)
  }
)
