import { ArcangelError, ArcangelErrorTypes } from "./errors"
import { isString } from "./is-string"

/**
 * Normalizes `currencyCode` by transforming it to lowercase
 */
export function normalizeCurrencyCode(currencyCode: string) {
    if (!isString(currencyCode)) {
        throw new ArcangelError(ArcangelErrorTypes.INVALID_ARGUMENT, "Currency code needs to be a string")
    }

    return currencyCode.toLowerCase()
}