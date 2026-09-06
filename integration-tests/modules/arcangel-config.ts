import { defineConfig } from "@arcangel/utils"

const { Modules } = require("@arcangel/utils")

const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_TEMP_NAME
const DB_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
process.env.POSTGRES_URL = DB_URL
process.env.LOG_LEVEL = "error"

const customTaxProviderRegistration = {
  resolve: {
    services: [require("@arcangel/tax/dist/providers/system").default],
  },
  id: "system_2",
}

const customPaymentProvider = {
  resolve: {
    services: [require("@arcangel/payment/dist/providers/system").default],
  },
  id: "default_2",
}

const customFulfillmentProvider = {
  resolve: "@arcangel/fulfillment-manual",
  id: "test-provider",
}

const customFulfillmentProviderCalculated = {
  resolve: require("./dist/utils/providers/fulfillment-manual-calculated")
    .default,
  id: "test-provider-calculated",
}

module.exports = defineConfig({
  admin: {
    disable: true,
  },
  plugins: [
    {
      resolve: "@arcangel/loyalty-plugin",
      options: {},
    },
  ],
  projectConfig: {
    databaseUrl: DB_URL,
    databaseType: "postgres",
    http: {
      jwtSecret: "test",
      cookieSecret: "test",
    },
  },
  featureFlags: {},
  modules: [
    {
      key: "testingModule",
      resolve: "__tests__/__fixtures__/testing-module",
    },
    {
      key: "auth",
      resolve: "@arcangel/auth",
      options: {
        providers: [
          {
            id: "emailpass",
            resolve: "@arcangel/auth-emailpass",
          },
        ],
      },
    },
    {
      key: Modules.USER,
      scope: "internal",
      resolve: "@arcangel/user",
      options: {
        jwt_secret: "test",
      },
    },
    {
      key: Modules.CACHE,
      resolve: "@arcangel/cache-inmemory",
      options: { ttl: 0 }, // Cache disabled
    },
    {
      key: Modules.LOCKING,
      resolve: "@arcangel/locking",
    },
    {
      key: Modules.STOCK_LOCATION,
      resolve: "@arcangel/stock-location",
      options: {},
    },
    {
      key: Modules.INVENTORY,
      resolve: "@arcangel/inventory",
      options: {},
    },
    {
      key: Modules.PRODUCT,
      resolve: "@arcangel/product",
    },
    {
      key: Modules.PRICING,
      resolve: "@arcangel/pricing",
    },
    {
      key: Modules.PROMOTION,
      resolve: "@arcangel/promotion",
    },
    {
      key: Modules.REGION,
      resolve: "@arcangel/region",
    },
    {
      key: Modules.CUSTOMER,
      resolve: "@arcangel/customer",
    },
    {
      key: Modules.SALES_CHANNEL,
      resolve: "@arcangel/sales-channel",
    },
    {
      key: Modules.CART,
      resolve: "@arcangel/cart",
    },
    {
      key: Modules.WORKFLOW_ENGINE,
      resolve: "@arcangel/workflow-engine-inmemory",
    },
    {
      key: Modules.API_KEY,
      resolve: "@arcangel/api-key",
    },
    {
      key: Modules.STORE,
      resolve: "@arcangel/store",
    },
    {
      key: Modules.TAX,
      resolve: "@arcangel/tax",
      options: {
        providers: [customTaxProviderRegistration],
      },
    },
    {
      key: Modules.CURRENCY,
      resolve: "@arcangel/currency",
    },
    {
      key: Modules.ORDER,
      resolve: "@arcangel/order",
    },
    {
      key: Modules.PAYMENT,
      resolve: "@arcangel/payment",
      options: {
        providers: [customPaymentProvider],
      },
    },
    {
      key: Modules.FULFILLMENT,
      resolve: "@arcangel/fulfillment",
      options: {
        providers: [
          customFulfillmentProvider,
          customFulfillmentProviderCalculated,
        ],
      },
    },
    {
      key: Modules.NOTIFICATION,
      options: {
        providers: [
          {
            resolve: "@arcangel/notification-local",
            id: "local-notification-provider",
            options: {
              name: "Local Notification Provider",
              channels: ["log", "email"],
            },
          },
        ],
      },
    },
    {
      key: Modules.INDEX,
      resolve: "@arcangel/index",
      disable: process.env.ENABLE_INDEX_MODULE !== "true",
    },
    {
      key: "brand",
      resolve: "src/modules/brand",
    },
    {
      key: Modules.RBAC,
      resolve: "@arcangel/rbac",
    },
  ],
})
