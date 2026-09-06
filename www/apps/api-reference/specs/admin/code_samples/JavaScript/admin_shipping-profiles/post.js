import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.shippingProfile.create({
  name: "Default Shipping Profile",
})
.then(({ shipping_profile }) => {
  console.log(shipping_profile)
})