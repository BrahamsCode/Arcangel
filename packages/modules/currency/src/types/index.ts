import { IEventBusModuleService, Logger } from "@arcangel/framework/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
  EventBus?: IEventBusModuleService
}
