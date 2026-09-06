import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.product.batchVariants("prod_123", {
  create: [
    {
      title: "Blue Shirt",
      options: {
        Color: "Blue"
      },
      prices: []
    }
  ],
  update: [
    {
      id: "variant_123",
      title: "Pants"
    }
  ],
  delete: ["variant_123"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})