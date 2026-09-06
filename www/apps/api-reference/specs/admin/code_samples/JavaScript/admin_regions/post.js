import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.region.create({
  name: "United States",
  currency_code: "usd",
})
.then(({ region }) => {
  console.log(region)
})