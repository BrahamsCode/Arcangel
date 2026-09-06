import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.productOption.create({
  title: "Size",
  values: ["S", "M"]
})
.then(({ product_option }) => {
  console.log(product_option)
})