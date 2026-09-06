import { normalizeLocale } from "@arcangel/utils"
import type {
  ArcangelNextFunction,
  ArcangelRequest,
  ArcangelResponse,
} from "../types"

const CONTENT_LANGUAGE_HEADER = "x-arcangel-locale"

/**
 * Middleware that resolves the locale for the current request.
 *
 * Resolution order:
 * 1. Query parameter `?locale=en-US`
 * 2. x-arcangel-locale header
 *
 * The resolved locale is set on `req.locale`.
 */
export async function applyLocale(
  req: ArcangelRequest,
  _: ArcangelResponse,
  next: ArcangelNextFunction
) {
  // 1. Check query parameter
  const queryLocale = req.query.locale as string | undefined
  if (queryLocale) {
    req.locale = normalizeLocale(queryLocale)
    delete req.query.locale
    return next()
  }

  // 2. Check x-arcangel-locale header
  const headerLocale = req.get(CONTENT_LANGUAGE_HEADER)
  if (headerLocale) {
    req.locale = normalizeLocale(headerLocale)
    return next()
  }

  return next()
}
