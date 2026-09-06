import { ContainerLike } from "@arcangel/framework"
import { Logger } from "@arcangel/framework/types"
import { FlowCancelOptions } from "@arcangel/framework/workflows-sdk"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

export type WorkflowOrchestratorCancelOptions = Omit<
  FlowCancelOptions,
  "transaction" | "transactionId" | "container"
> & {
  transactionId: string
  container?: ContainerLike
}
