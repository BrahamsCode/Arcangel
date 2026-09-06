import { ArcangelContainer } from "@arcangel/framework/types"
import { ContainerRegistrationKeys, Modules } from "@arcangel/framework/utils"

/**
 * Enables payment providers in a region by creating the `region_payment_provider`
 * links directly. Useful for tests that create regions through the Region Module
 * rather than through `createRegionsWorkflow`.
 */
export const linkRegionPaymentProviders = async (
  container: ArcangelContainer,
  regionId: string,
  paymentProviderIds: string[] = ["pp_system_default"]
) => {
  const link = container.resolve(ContainerRegistrationKeys.LINK)

  await link.create(
    paymentProviderIds.map((paymentProviderId) => ({
      [Modules.REGION]: { region_id: regionId },
      [Modules.PAYMENT]: { payment_provider_id: paymentProviderId },
    }))
  )
}
