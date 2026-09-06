import { ModuleProvider, Modules } from "@arcangel/framework/utils"
import { EmailPassAuthService } from "./services/emailpass"

const services = [EmailPassAuthService]

export default ModuleProvider(Modules.AUTH, {
  services,
})
