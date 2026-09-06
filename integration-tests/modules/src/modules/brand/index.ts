import { Module } from "@arcangel/utils"
import { BrandModuleService } from "./service"

export const BRAND_MODULE = "brand"

export default Module(BRAND_MODULE, {
  service: BrandModuleService,
})
