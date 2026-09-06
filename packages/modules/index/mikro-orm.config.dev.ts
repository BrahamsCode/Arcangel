import { defineMikroOrmCliConfig, Modules } from "@arcangel/framework/utils"
import * as entities from "./src/models"

export default defineMikroOrmCliConfig(Modules.INDEX, {
  entities: Object.values(entities),
})
