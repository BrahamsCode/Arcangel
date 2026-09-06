import type {
  ArcangelNextFunction,
  ArcangelRequest,
  ArcangelResponse,
} from "../types"

export function applyParamsAsFilters(mappings: { [param: string]: string }) {
  return async function paramsAsFiltersMiddleware(
    req: ArcangelRequest,
    _: ArcangelResponse,
    next: ArcangelNextFunction
  ) {
    for (const [param, paramValue] of Object.entries(req.params)) {
      if (mappings[param]) {
        req.filterableFields[mappings[param]] = paramValue
      }
    }

    return next()
  }
}
