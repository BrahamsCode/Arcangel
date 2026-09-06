import { defineSearchIndex, search } from "@arcangel/utils"

export const productIndex = defineSearchIndex({
  name: "product",
  entity: "product",
  fields: search.define({
    id: search.keyword().filterable(),
    title: search.text().searchable(),
  }),
  async *seed() {},
})
