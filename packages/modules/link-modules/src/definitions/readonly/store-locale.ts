import { ModuleJoinerConfig } from "@arcangel/framework/types"
import {
  FeatureFlag,
  ARCANGEL_SKIP_FILE,
  Modules,
} from "@arcangel/framework/utils"

export const StoreLocales: ModuleJoinerConfig = {
  [ARCANGEL_SKIP_FILE]: !(
    FeatureFlag.isFeatureEnabled("translation") ||
    process.env.ARCANGEL_FF_TRANSLATION === "true"
  ),
  isLink: true,
  isReadOnlyLink: true,
  extends: [
    {
      serviceName: Modules.STORE,
      entity: "StoreLocale",
      relationship: {
        serviceName: Modules.TRANSLATION,
        entity: "Locale",
        primaryKey: "code",
        foreignKey: "locale_code",
        alias: "locale",
        args: {
          methodSuffix: "Locales",
        },
      },
    },
  ],
} as ModuleJoinerConfig
