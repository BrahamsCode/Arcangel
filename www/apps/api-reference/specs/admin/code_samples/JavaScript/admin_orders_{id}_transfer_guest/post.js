import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.order.transferToGuest("order_123", {
  email: "customer@example.com",
  internal_note: "Internal note",
})
.then(({ order }) => {
  console.log(order)
})