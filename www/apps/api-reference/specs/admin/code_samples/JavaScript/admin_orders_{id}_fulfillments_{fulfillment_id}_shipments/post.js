import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.order.createShipment(
  "order_123",
  "ful_123",
  {
    items: [
      {
        id: "fulit_123",
        quantity: 1
      }
    ]
  }
)
.then(({ order }) => {
  console.log(order)
})