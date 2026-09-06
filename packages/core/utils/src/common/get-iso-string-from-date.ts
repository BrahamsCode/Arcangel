import { isDate } from "./is-date"
import { ArcangelError } from "./errors"

export const GetIsoStringFromDate = (date: Date | string) => {
  if (!isDate(date)) {
    throw new ArcangelError(
      ArcangelError.Types.INVALID_DATA,
      `Cannot format date to ISO string: ${date}`
    )
  }

  date = new Date(date)

  return date.toISOString()
}
