type ApiType = "store" | "admin" | "combined"

type CircularReferenceSchema = Record<string, string[]>

type CircularReferenceConfig = {
  decorators: {
    "arcangel/circular-patch": {
      schemas: CircularReferenceSchema
    }
  }
}
