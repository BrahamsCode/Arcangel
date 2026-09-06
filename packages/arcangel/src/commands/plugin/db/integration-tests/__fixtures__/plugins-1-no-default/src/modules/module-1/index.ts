import { ArcangelService, Module } from "@arcangel/framework/utils"

export const module1 = Module("module1", {
  service: class Module1Service extends ArcangelService({}) {},
})
