import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.productCategory.updateProducts("pcat_123", {
  add: ["prod_123"],
  remove: ["prod_321"]
})
.then(({ product_category }) => {
  console.log(product_category)
})