"use client"

import { DatePicker } from "@arcangel/ui"

export default function DatePickerWithTime() {
  return (
    <div className="w-[300px]">
      <DatePicker
        granularity="minute"
        defaultValue={new Date()}
        aria-label="Select date and time"
      />
    </div>
  )
}
