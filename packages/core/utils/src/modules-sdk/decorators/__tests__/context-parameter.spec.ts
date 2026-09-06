import { ArcangelContext } from "../context-parameter"

describe("ArcangelContext", () => {
  it("keeps inherited context indexes when adding child metadata", () => {
    const parentPrototype = {}
    ArcangelContext()(parentPrototype, "createProductOptions", 1)

    const childPrototype = Object.create(parentPrototype)
    ArcangelContext()(childPrototype, "updateProductOptionValues", 2)

    expect(ArcangelContext.getIndex(childPrototype, "createProductOptions")).toBe(
      1
    )
    expect(
      ArcangelContext.getIndex(childPrototype, "updateProductOptionValues")
    ).toBe(2)
  })

  it("keeps overridden context indexes on the child prototype", () => {
    const parentPrototype = {}
    ArcangelContext()(parentPrototype, "updateProductOptionValues", 1)

    const childPrototype = Object.create(parentPrototype)
    ArcangelContext()(childPrototype, "updateProductOptionValues", 2)

    expect(
      Object.prototype.hasOwnProperty.call(
        childPrototype,
        "ArcangelContextIndex_"
      )
    ).toBe(true)
    expect(
      ArcangelContext.getIndex(parentPrototype, "updateProductOptionValues")
    ).toBe(1)
    expect(
      ArcangelContext.getIndex(childPrototype, "updateProductOptionValues")
    ).toBe(2)
  })
})
