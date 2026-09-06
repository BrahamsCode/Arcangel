import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.return.updateReceiveItem("return_123", "orchach_123", {
  quantity: 2,
})
.then(({ return }) => {
  console.log(return)
})