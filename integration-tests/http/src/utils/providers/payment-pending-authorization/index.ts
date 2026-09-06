import { ModuleProvider, Modules } from "@arcangel/framework/utils"
import { PendingAuthorizationPaymentProvider } from "./provider"

const services = [PendingAuthorizationPaymentProvider]

export default ModuleProvider(Modules.PAYMENT, {
  services,
})
