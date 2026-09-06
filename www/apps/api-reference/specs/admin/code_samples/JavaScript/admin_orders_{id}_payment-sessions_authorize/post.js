import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.order.authorizePaymentSession("order_123", "payses_123")
.then(({ order, is_authorized }) => {
  console.log(order, is_authorized)
})