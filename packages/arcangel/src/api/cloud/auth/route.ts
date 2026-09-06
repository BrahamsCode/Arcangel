import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

export const GET = async (req: ArcangelRequest, res: ArcangelResponse) => {
  const config = req.scope.resolve(ContainerRegistrationKeys.CONFIG_MODULE)

  res.status(200).json({
    enabled:
      !!config.projectConfig.http.authMethodsPerActor?.user?.includes("cloud"),
  })
}
