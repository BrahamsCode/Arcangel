import * as entities from "./src/models"
import { defineMikroOrmCliConfig, Modules } from "@arcangel/framework/utils"

export default defineMikroOrmCliConfig(Modules.STORE, {
  entities: Object.values(entities),
})
