import { FlagSettings } from "@arcangel/framework/feature-flags"

const IndexEngineFeatureFlag: FlagSettings = {
  key: "index_engine",
  default_val: false,
  env_key: "ARCANGEL_FF_INDEX_ENGINE",
  description: "Enable Arcangel to use the index engine in some part of the core",
}

export default IndexEngineFeatureFlag
