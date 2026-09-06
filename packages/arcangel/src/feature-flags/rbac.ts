import { FlagSettings } from "@arcangel/framework/feature-flags"

const RbacFeatureFlag: FlagSettings = {
  key: "rbac",
  default_val: false,
  env_key: "ARCANGEL_FF_RBAC",
  description: "Enable role based access control",
}

export default RbacFeatureFlag
