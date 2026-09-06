import type { PricingWorkflow } from "@arcangel/framework/types"
import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
} from "@arcangel/framework/workflows-sdk"
import { updatePricePreferencesStep } from "../steps"

export const updatePricePreferencesWorkflowId = "update-price-preferences"
/**
 * This workflow updates one or more price preferences. It's used by the
 * [Update Price Preference Admin API Route](https://docs.arcangel.com/api/admin/price-preferences/update-a-price-preference).
 *
 * You can use this workflow within your customizations or your own custom workflows, allowing you to
 * update price preferences in your custom flows.
 *
 * @example
 * const { result } = await updatePricePreferencesWorkflow(container)
 * .run({
 *   input: {
 *     selector: {
 *       id: ["pp_123"]
 *     },
 *     update: {
 *       is_tax_inclusive: true
 *     }
 *   }
 * })
 *
 * @summary
 *
 * Update one or more price preferences.
 */
export const updatePricePreferencesWorkflow = createWorkflow(
  updatePricePreferencesWorkflowId,
  (
    input: WorkflowData<PricingWorkflow.UpdatePricePreferencesWorkflowInput>
  ) => {
    return new WorkflowResponse(updatePricePreferencesStep(input))
  }
)
