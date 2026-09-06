import { StoreModuleService } from "@services"
import { Module, Modules } from "@arcangel/framework/utils"

export default Module(Modules.STORE, {
  service: StoreModuleService,
})
