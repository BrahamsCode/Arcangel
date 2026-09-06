import { SearchTypes } from "@arcangel/types"
import { ArcangelModule } from "../arcangel-module"

const definition = (name: string): SearchTypes.SearchIndexDefinition => ({
  name,
  entity: name,
  fields: { id: { type: "keyword", filterable: true } },
  async *seed() {},
})

describe("ArcangelModule search index registry", () => {
  beforeEach(() => {
    ArcangelModule.clearInstances()
  })

  it("registers definitions and hands them out in registration order", () => {
    ArcangelModule.setSearchIndex(definition("product"), "/search/product.ts")
    ArcangelModule.setSearchIndex(definition("customer"), "/search/customer.ts")

    expect(ArcangelModule.getSearchIndexes().map((index) => index.name)).toEqual([
      "product",
      "customer",
    ])
  })

  it("keeps every index a single file declares", () => {
    ArcangelModule.setSearchIndex(definition("order"), "/search/orders.ts")
    ArcangelModule.setSearchIndex(definition("return"), "/search/orders.ts")

    expect(ArcangelModule.getSearchIndexes().map((index) => index.name)).toEqual([
      "order",
      "return",
    ])
  })

  it("replaces rather than duplicates when the same file registers the same name", () => {
    ArcangelModule.setSearchIndex(definition("product"), "/search/product.ts")
    ArcangelModule.setSearchIndex(definition("product"), "/search/product.ts")

    expect(ArcangelModule.getSearchIndexes().length).toBe(1)
  })

  it("accepts the same definition object arriving through a file and the options", () => {
    const productDefinition = definition("product")

    // `defineSearchIndex` registers the definition it also returns, so the
    // very same object can come back through the Search Module's options.
    ArcangelModule.setSearchIndex(productDefinition, "/search/product.ts")
    ArcangelModule.setSearchIndex(productDefinition)

    expect(ArcangelModule.getSearchIndexes().length).toBe(1)
  })

  it("rejects two files claiming the same index name", () => {
    ArcangelModule.setSearchIndex(definition("product"), "/search/product.ts")

    expect(() =>
      ArcangelModule.setSearchIndex(definition("product"), "/search/products.ts")
    ).toThrow(
      'Search index "product" is defined twice: in /search/product.ts and /search/products.ts'
    )
  })

  it("replaces rather than duplicates when an inline definition re-registers", () => {
    ArcangelModule.setSearchIndex(definition("product"))
    ArcangelModule.setSearchIndex(definition("product"))

    expect(ArcangelModule.getSearchIndexes().length).toBe(1)
  })

  it("rejects a file and the module options claiming the same index name", () => {
    ArcangelModule.setSearchIndex(definition("product"), "/search/product.ts")

    expect(() => ArcangelModule.setSearchIndex(definition("product"))).toThrow(
      `Search index "product" is defined twice: in /search/product.ts and the Search Module's options`
    )
  })
})
