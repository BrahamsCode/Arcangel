import { ArcangelService, Module } from "@arcangel/framework/utils"

export default Module("module2", {
  service: class Module2Service extends ArcangelService({}) {},
})

