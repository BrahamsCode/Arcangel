# Arcangel Cache Redis

Use Redis as a Arcangel cache store.

## Installation

```
yarn add @arcangel/cache-redis
```

## Options

```
   {
      ttl?: number                // Time to keep data in cache (in seconds)

      redisUrl?: string           // Redis instance connection string

      redisOptions?: RedisOptions // Redis client options

      namespace?: string          // Prefix for event keys (the default is `arcangel:`)
  }
```

### Other caching modules

- [Arcangel Cache In-Memory](../cache-inmemory/README.md)
