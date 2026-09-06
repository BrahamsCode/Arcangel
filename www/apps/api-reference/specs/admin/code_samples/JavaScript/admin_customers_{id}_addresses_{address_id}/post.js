import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.customer.updateAddress("cus_123", "cus_addr_123", {
  address_1: "123 Main St",
  city: "Anytown",
  country_code: "US",
  postal_code: "12345"
})
.then(({ customer }) => {
  console.log(customer)
})