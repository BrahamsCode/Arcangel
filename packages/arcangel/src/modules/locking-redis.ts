import RedisLockingProvider from "@arcangel/locking-redis"

export * from "@arcangel/locking-redis"

export default RedisLockingProvider
export const discoveryPath = require.resolve("@arcangel/locking-redis")
