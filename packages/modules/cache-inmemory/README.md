# Arcangel Cache In-memory

Arcangel in-memory cache module. Use plain JS Map as a cache store.

## Installation

```
yarn add @arcangel/cache-inmemory
```

## Options

```
{
  ttl?: number // Time to keep data in cache (in seconds)
}
```

### Note

Recommended for testing and development. For production, use Redis cache module.

### Other caching modules

- [Arcangel Cache Redis](../cache-redis/README.md)
