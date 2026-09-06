import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.views.retrieveConfiguration("orders", "viewconfig_123")
.then(({ view_configuration }) => {
  console.log(view_configuration)
})