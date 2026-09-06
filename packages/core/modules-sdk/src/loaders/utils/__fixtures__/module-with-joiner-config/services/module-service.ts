import { IModuleService, ModuleJoinerConfig } from "@arcangel/types"
import { defineJoinerConfig } from "@arcangel/utils"

export class ModuleService implements IModuleService {
  __joinerConfig(): ModuleJoinerConfig {
    return defineJoinerConfig("module-service", {
      alias: [
        {
          name: ["custom_name"],
          entity: "Custom",
        },
      ],
    })
  }
}
