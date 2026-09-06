import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.views.listConfigurations("orders")
.then(({ view_configurations, count, limit, offset }) => {
  console.log(view_configurations)
})