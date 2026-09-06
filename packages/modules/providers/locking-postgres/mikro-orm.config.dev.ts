import * as entities from "./src/models"

import { defineMikroOrmCliConfig } from "@arcangel/framework/utils"

export default defineMikroOrmCliConfig("lockingPostgres", {
  entities: Object.values(entities),
})
