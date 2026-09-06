import { IModuleService } from "@arcangel/types"
import { ArcangelContext } from "@arcangel/utils"

// @ts-expect-error
export class ModuleService implements IModuleService {
  public property = "value"

  constructor() {}
  async methodName(input, @ArcangelContext() context) {
    return input + " called"
  }
}
