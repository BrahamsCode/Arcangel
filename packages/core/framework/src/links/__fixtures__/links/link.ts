import { defineLink, ArcangelService, model, Module } from "@arcangel/utils"

const model1 = model.define("model-1", {
  id: model.id().primaryKey(),
})

const model2 = model.define("model-2", {
  id: model.id().primaryKey(),
})

const module1 = Module("module-1", {
  service: class Service1 extends ArcangelService({ model1 }) {},
})

const module2 = Module("module-2", {
  service: class Service2 extends ArcangelService({ model2 }) {},
})

export const module1And2Link = defineLink(
  module1.linkable.model1,
  module2.linkable.model2
)
