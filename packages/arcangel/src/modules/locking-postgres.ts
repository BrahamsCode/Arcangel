import PostgresLockingProvider from "@arcangel/locking-postgres"

export * from "@arcangel/locking-postgres"

export default PostgresLockingProvider
export const discoveryPath = require.resolve("@arcangel/locking-postgres")
