import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

const token = await sdk.auth.refresh()

// all subsequent requests will use the token in the header
const { user } = await sdk.admin.user.me()