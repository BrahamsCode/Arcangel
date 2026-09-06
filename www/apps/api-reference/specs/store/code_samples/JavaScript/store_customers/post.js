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

const token = await sdk.auth.register("customer", "emailpass", {
  "email": "customer@gmail.com",
  "password": "supersecret"
})

sdk.store.customer.create(
  {
    "email": "customer@gmail.com"
  },
  {},
  {
    Authorization: `Bearer ${token}`
  }
)
.then(({ customer }) => {
  console.log(customer)
})