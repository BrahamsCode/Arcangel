import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.pricePreference.update("prpref_123", {
  is_tax_inclusive: true
})
.then(({ price_preference }) => {
  console.log(price_preference)
})