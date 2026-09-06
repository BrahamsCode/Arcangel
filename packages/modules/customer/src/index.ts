import { CustomerModuleService } from "@services"
import { Module, Modules } from "@arcangel/framework/utils"

export default Module(Modules.CUSTOMER, {
  service: CustomerModuleService,
})
