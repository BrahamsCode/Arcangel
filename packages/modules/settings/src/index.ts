import "./types"
import { SettingsModuleService } from "@/services"
import { Module } from "@arcangel/framework/utils"
import { Modules } from "@arcangel/utils"

export default Module(Modules.SETTINGS, {
  service: SettingsModuleService,
})

export * from "./utils"
