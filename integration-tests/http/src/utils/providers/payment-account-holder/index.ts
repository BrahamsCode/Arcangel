import { ModuleProvider, Modules } from "@arcangel/framework/utils"
import { AccountHolderPaymentProvider } from "./services/account-holder-payment"

const services = [AccountHolderPaymentProvider]

export default ModuleProvider(Modules.PAYMENT, {
  services,
})
