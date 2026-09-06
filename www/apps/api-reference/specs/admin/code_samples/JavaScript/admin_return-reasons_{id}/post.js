import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.returnReason.update("ret_123", {
  value: "refund",
  label: "Refund",
})
.then(({ return_reason }) => {
  console.log(return_reason)
})