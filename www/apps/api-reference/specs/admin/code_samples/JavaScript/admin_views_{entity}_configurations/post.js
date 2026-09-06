import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

const { view_configuration } = await sdk.admin.views.createConfiguration(
  "orders",
  {
    name: "My Orders View",
    configuration: {
      visible_columns: ["display_id", "status"],
      column_order: ["display_id", "status"],
    },
  }
)