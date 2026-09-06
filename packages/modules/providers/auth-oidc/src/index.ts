import { ModuleProvider, Modules } from "@arcangel/framework/utils"
import { OidcAuthService } from "./services/oidc"

const services = [OidcAuthService]

export default ModuleProvider(Modules.AUTH, {
  services,
})
