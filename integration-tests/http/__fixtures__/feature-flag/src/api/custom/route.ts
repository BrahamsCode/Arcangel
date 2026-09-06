import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { defineFileConfig, FeatureFlag } from "@arcangel/utils"

defineFileConfig({
  isDisabled: () => !FeatureFlag.isFeatureEnabled("custom_ff"),
})

export const GET = async (req: ArcangelRequest, res: ArcangelResponse) => {
  res.json({ message: "Custom GET" })
}

export const POST = async (req: ArcangelRequest, res: ArcangelResponse) => {
  res.json({ message: "Custom POST", body: req.validatedBody })
}
