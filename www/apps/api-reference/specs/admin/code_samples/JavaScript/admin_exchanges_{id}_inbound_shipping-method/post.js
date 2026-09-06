import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.exchange.addInboundShipping("exchange_123", {
  shipping_option_id: "so_123"
})
.then(({ return: returnData }) => {
  console.log(returnData)
})