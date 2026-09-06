import { ArcangelService, Module } from "@arcangel/framework/utils"

export default Module("module1", {
  service: class Module1Service extends ArcangelService({}) {},
})
