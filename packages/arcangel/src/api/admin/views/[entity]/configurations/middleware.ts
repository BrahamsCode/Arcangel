import {
  ArcangelNextFunction,
  ArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"
import ViewConfigurationsFeatureFlag from "../../../../../feature-flags/view-configurations"

export const ensureViewConfigurationsEnabled = async (
  req: ArcangelRequest,
  res: ArcangelResponse,
  next: ArcangelNextFunction
) => {
  const flagRouter = req.scope.resolve(
    ContainerRegistrationKeys.FEATURE_FLAG_ROUTER
  ) as any

  if (!flagRouter.isFeatureEnabled(ViewConfigurationsFeatureFlag.key)) {
    res.status(404).json({
      type: "not_found",
      message: "Route not found",
    })
    return
  }

  next()
}
