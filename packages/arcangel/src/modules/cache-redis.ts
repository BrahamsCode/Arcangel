import RedisCacheModule from "@arcangel/cache-redis"

export * from "@arcangel/cache-redis"

export default RedisCacheModule
export const discoveryPath = require.resolve("@arcangel/cache-redis")
