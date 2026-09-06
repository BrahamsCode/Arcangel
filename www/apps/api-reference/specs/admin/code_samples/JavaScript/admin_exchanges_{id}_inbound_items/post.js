import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.exchange.addInboundItems("exchange_123", {
  items: [{
    id: "orli_123",
    quantity: 1
  }]
})
.then(({ return: returnData }) => {
  console.log(returnData)
})