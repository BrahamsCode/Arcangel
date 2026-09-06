import { ArcangelModule } from "@arcangel/framework/modules-sdk"
import { IEventBusService } from "@arcangel/framework/types"
import { Modules } from "@arcangel/framework/utils"

export const initialize = async (): Promise<IEventBusService> => {
  const serviceKey = Modules.EVENT_BUS
  const loaded = await ArcangelModule.bootstrap<IEventBusService>({
    moduleKey: serviceKey,
    defaultPath: "@arcangel/event-bus-local",
  })

  return loaded[serviceKey]
}
