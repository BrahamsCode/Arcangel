import { defineJoinerConfig, Modules } from "@arcangel/framework/utils"

export const joinerConfig = defineJoinerConfig(Modules.FILE, {
  models: [{ name: "File" }],
})
