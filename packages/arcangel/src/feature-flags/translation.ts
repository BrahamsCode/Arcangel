import { FlagSettings } from "@arcangel/framework/feature-flags"

const TranslationFeatureFlag: FlagSettings = {
  key: "translation",
  default_val: false,
  env_key: "ARCANGEL_FF_TRANSLATION",
  description: "Enable multi-language support and entity translations",
}

export default TranslationFeatureFlag
