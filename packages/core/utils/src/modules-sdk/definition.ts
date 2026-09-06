export const Modules = {
  ANALYTICS: "analytics",
  AUTH: "auth",
  CACHE: "cache",
  CART: "cart",
  CUSTOMER: "customer",
  EVENT_BUS: "event_bus",
  INVENTORY: "inventory",
  LINK: "link_modules",
  PAYMENT: "payment",
  PRICING: "pricing",
  PRODUCT: "product",
  PROMOTION: "promotion",
  SALES_CHANNEL: "sales_channel",
  TAX: "tax",
  FULFILLMENT: "fulfillment",
  STOCK_LOCATION: "stock_location",
  USER: "user",
  WORKFLOW_ENGINE: "workflows",
  REGION: "region",
  ORDER: "order",
  API_KEY: "api_key",
  STORE: "store",
  CURRENCY: "currency",
  FILE: "file",
  NOTIFICATION: "notification",
  INDEX: "index",
  SEARCH: "search",
  LOCKING: "locking",
  SETTINGS: "settings",
  CACHING: "caching",
  TRANSLATION: "translation",
  RBAC: "rbac",
} as const

export const MODULE_PACKAGE_NAMES = {
  [Modules.ANALYTICS]: "@arcangel/arcangel/analytics",
  [Modules.AUTH]: "@arcangel/arcangel/auth",
  [Modules.CACHE]: "@arcangel/arcangel/cache-inmemory",
  [Modules.CART]: "@arcangel/arcangel/cart",
  [Modules.CUSTOMER]: "@arcangel/arcangel/customer",
  [Modules.EVENT_BUS]: "@arcangel/arcangel/event-bus-local",
  [Modules.INVENTORY]: "@arcangel/arcangel/inventory",
  [Modules.LINK]: "@arcangel/arcangel/link-modules",
  [Modules.PAYMENT]: "@arcangel/arcangel/payment",
  [Modules.PRICING]: "@arcangel/arcangel/pricing",
  [Modules.PRODUCT]: "@arcangel/arcangel/product",
  [Modules.PROMOTION]: "@arcangel/arcangel/promotion",
  [Modules.SALES_CHANNEL]: "@arcangel/arcangel/sales-channel",
  [Modules.FULFILLMENT]: "@arcangel/arcangel/fulfillment",
  [Modules.STOCK_LOCATION]: "@arcangel/arcangel/stock-location",
  [Modules.TAX]: "@arcangel/arcangel/tax",
  [Modules.USER]: "@arcangel/arcangel/user",
  [Modules.WORKFLOW_ENGINE]: "@arcangel/arcangel/workflow-engine-inmemory",
  [Modules.REGION]: "@arcangel/arcangel/region",
  [Modules.ORDER]: "@arcangel/arcangel/order",
  [Modules.API_KEY]: "@arcangel/arcangel/api-key",
  [Modules.STORE]: "@arcangel/arcangel/store",
  [Modules.CURRENCY]: "@arcangel/arcangel/currency",
  [Modules.FILE]: "@arcangel/arcangel/file",
  [Modules.NOTIFICATION]: "@arcangel/arcangel/notification",
  [Modules.INDEX]: "@arcangel/arcangel/index-module",
  [Modules.SEARCH]: "@arcangel/arcangel/search",
  [Modules.LOCKING]: "@arcangel/arcangel/locking",
  [Modules.SETTINGS]: "@arcangel/arcangel/settings",
  [Modules.CACHING]: "@arcangel/arcangel/caching",
  [Modules.TRANSLATION]: "@arcangel/arcangel/translation",
  [Modules.RBAC]: "@arcangel/arcangel/rbac",
}

export const REVERSED_MODULE_PACKAGE_NAMES = Object.entries(
  MODULE_PACKAGE_NAMES
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {})

// TODO: temporary fix until the event bus, cache and workflow engine are migrated to use providers and therefore only a single resolution will be good
export const TEMPORARY_REDIS_MODULE_PACKAGE_NAMES = {
  [Modules.EVENT_BUS]: "@arcangel/arcangel/event-bus-redis",
  [Modules.CACHE]: "@arcangel/arcangel/cache-redis",
  [Modules.WORKFLOW_ENGINE]: "@arcangel/arcangel/workflow-engine-redis",
  [Modules.LOCKING]: "@arcangel/arcangel/locking-redis",
}

REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.EVENT_BUS]
] = Modules.EVENT_BUS
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.CACHE]
] = Modules.CACHE
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.WORKFLOW_ENGINE]
] = Modules.WORKFLOW_ENGINE
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.LOCKING]
] = Modules.LOCKING

/**
 * Making modules be referenced as a type as well.
 */
export type Modules = (typeof Modules)[keyof typeof Modules]
export const ModuleRegistrationName = Modules
