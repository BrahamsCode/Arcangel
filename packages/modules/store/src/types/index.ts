import {
  IEventBusModuleService,
  Logger,
  StoreTypes,
} from "@arcangel/framework/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
  EventBus?: IEventBusModuleService
}

export type UpdateStoreInput = StoreTypes.UpdateStoreDTO & { id: string }
