import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.productType.retrieve("ptyp_123")
.then(({ product_type }) => {
  console.log(product_type)
})