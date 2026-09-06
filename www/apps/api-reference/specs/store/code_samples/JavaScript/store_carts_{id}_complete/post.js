import Arcangel from "@arcangel/js-sdk"

let ARCANGEL_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_ARCANGEL_BACKEND_URL) {
  ARCANGEL_BACKEND_URL = process.env.NEXT_PUBLIC_ARCANGEL_BACKEND_URL
}

export const sdk = new Arcangel({
  baseUrl: ARCANGEL_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_ARCANGEL_PUBLISHABLE_KEY,
})

sdk.store.cart.complete("cart_123")
.then((data) => {
  if(data.type === "cart") {
    // an error occurred
    console.log(data.error, data.cart)
  } else {
    // order placed successfully
    console.log(data.order)
  }
})