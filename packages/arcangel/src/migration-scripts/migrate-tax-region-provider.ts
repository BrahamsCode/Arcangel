import { updateTaxRegionsStep, useQueryGraphStep } from "@arcangel/core-flows"
import { ArcangelModule } from "@arcangel/framework/modules-sdk"
import { ExecArgs } from "@arcangel/framework/types"
import { ContainerRegistrationKeys, Modules } from "@arcangel/framework/utils"
import { createWorkflow, transform, WorkflowResponse } from "@arcangel/framework/workflows-sdk"

const assignSystemProviderToTaxRegionsWorkflow = createWorkflow(
  "assign-system-provider-to-tax-regions",
  () => {
    const { data: taxRegions } = useQueryGraphStep({
      entity: "tax_region",
      fields: ["id", "provider_id", "province_code"],
    })

    const updateData = transform({ taxRegions }, ({ taxRegions }) => {
      /**
       * Update only parent regions that don't have a provider set.
       */
      return taxRegions
        .filter(
          (taxRegion) => !taxRegion.province_code && !taxRegion.provider_id
        )
        .map((taxRegion) => ({
          id: taxRegion.id,
          provider_id: "tp_system",
        }))
    })

    updateTaxRegionsStep(updateData)

    return new WorkflowResponse(void 0)
  }
)

export default async function assignTaxSystemProviderToTaxRegions({
  container,
}: ExecArgs) {
  if (!ArcangelModule.isInstalled(Modules.TAX)) {
    return
  }

  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  logger.info("Assigning tax system provider to tax regions")

  try {
    await assignSystemProviderToTaxRegionsWorkflow(container).run()
    logger.info("System provider assigned to tax regions")
  } catch (e) {
    logger.error(e)
    throw e
  }
}
