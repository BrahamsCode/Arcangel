import { ModuleProvider, Modules } from "@arcangel/framework/utils"
import { TaxDataProviderService } from "./services/tax-data-provider"

const services = [TaxDataProviderService]

export default ModuleProvider(Modules.TAX, {
  services,
})
