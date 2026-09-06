import InventoryModuleService from "./services/inventory-module"
import { Module, Modules } from "@arcangel/framework/utils"

export default Module(Modules.INVENTORY, {
  service: InventoryModuleService,
})
