import RedisCachingProvider from "@arcangel/caching-redis"

export * from "@arcangel/caching-redis"

export default RedisCachingProvider
export const discoveryPath = require.resolve("@arcangel/caching-redis")
