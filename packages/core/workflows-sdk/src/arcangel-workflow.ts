import { LocalWorkflow } from "@arcangel/orchestration"
import { LoadedModule, ArcangelContainer } from "@arcangel/types"
import { ExportedWorkflow } from "./helper"

class ArcangelWorkflow {
  static workflows: Record<
    string,
    (
      container?: LoadedModule[] | ArcangelContainer
    ) => Omit<
      LocalWorkflow,
      "run" | "registerStepSuccess" | "registerStepFailure" | "cancel"
    > &
      ExportedWorkflow
  > = {}

  static registerWorkflow(workflowId, exportedWorkflow) {
    if (workflowId in ArcangelWorkflow.workflows) {
      return
    }

    ArcangelWorkflow.workflows[workflowId] = exportedWorkflow
  }

  static unregisterWorkflow(workflowId) {
    delete ArcangelWorkflow.workflows[workflowId]
  }

  static getWorkflow(workflowId): ExportedWorkflow {
    return ArcangelWorkflow.workflows[workflowId] as unknown as ExportedWorkflow
  }
}

global.ArcangelWorkflow ??= ArcangelWorkflow
const GlobalArcangelWorkflow = global.ArcangelWorkflow

export { GlobalArcangelWorkflow as ArcangelWorkflow }
