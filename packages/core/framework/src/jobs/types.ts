import { ArcangelContainer } from "@arcangel/types"

export type ScheduledJobContext = {
  /**
   * The timestamp for which the job was scheduled.
   */
  scheduledFor: Date
}

export type ScheduledJobHandler = (
  container: ArcangelContainer,
  context?: ScheduledJobContext
) => Promise<unknown>

export type ScheduledJobWorkflowInput = {
  scheduledFor: string
}
