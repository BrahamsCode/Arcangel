import { ArcangelService, Module } from "@arcangel/framework/utils"

export default Module("moduleEmpty", {
  service: class ModuleEmptyService extends ArcangelService({}) {},
})

