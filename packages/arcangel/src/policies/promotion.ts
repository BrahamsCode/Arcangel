import { definePolicies } from "@arcangel/framework/utils"
import { generateResourcePolicies } from "../utils"

const promotionResources = ["campaign", "promotion"]

export const promotionPolicies = definePolicies(
  generateResourcePolicies(promotionResources)
)
