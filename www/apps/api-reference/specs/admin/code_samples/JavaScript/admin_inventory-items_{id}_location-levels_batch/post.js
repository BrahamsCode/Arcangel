import Arcangel from "@arcangel/js-sdk"

export const sdk = new Arcangel({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.inventoryItem.batchInventoryItemLocationLevels("iitem_123", {
  create: [{
    location_id: "sloc_123",
    stocked_quantity: 10
  }],
  delete: ["ilvl_123"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})