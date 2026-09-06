import { ArcangelContainer } from "@arcangel/types"
import { ScheduledJobContext } from "../../../types"

declare global {
  // eslint-disable-next-line no-var
  var __arcangelScheduledForTest: Date | undefined
}

export default async function scheduledForJob(
  _container: ArcangelContainer,
  context: ScheduledJobContext
) {
  global.__arcangelScheduledForTest = context.scheduledFor
}

export const config = {
  name: "capture-scheduled-for",
  schedule: "* * * * * *",
}
