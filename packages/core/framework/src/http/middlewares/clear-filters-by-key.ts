import type {
  ArcangelNextFunction,
  ArcangelRequest,
  ArcangelResponse,
} from "../types"

export function clearFiltersByKey(keys: string[]) {
  return async function clearFiltersByKeyMiddleware(
    req: ArcangelRequest,
    _: ArcangelResponse,
    next: ArcangelNextFunction
  ) {
    keys.forEach((key) => {
      delete req.filterableFields[key]
    })

    return next()
  }
}
