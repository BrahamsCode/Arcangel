import { ArcangelContainer } from "@arcangel/framework/types"
import { defineFileConfig, FeatureFlag } from "@arcangel/framework/utils"

export const testJobHandler = jest.fn()

export default async function greetingJob(container: ArcangelContainer) {
  testJobHandler()
}

export const config = {
  name: "greeting-every-second",
  numberOfExecutions: 1,
  schedule: "* * * * * *",
}

defineFileConfig({
  isDisabled: () => !FeatureFlag.isFeatureEnabled("custom_ff"),
})
