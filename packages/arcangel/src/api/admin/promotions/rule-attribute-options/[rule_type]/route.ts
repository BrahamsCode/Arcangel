import { HttpTypes } from "@arcangel/framework/types"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { getRuleAttributesMap, validateRuleType } from "../../utils"
import {
  ApplicationMethodTargetTypeValues,
  ApplicationMethodTypeValues,
  PromotionTypeValues,
} from "@arcangel/types"

export const GET = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminGetPromotionRuleParams>,
  res: ArcangelResponse<HttpTypes.AdminRuleAttributeOptionsListResponse>
) => {
  const { rule_type: ruleType } = req.params

  validateRuleType(ruleType)

  const attributes =
    getRuleAttributesMap({
      promotionType: req.query.promotion_type as PromotionTypeValues,
      applicationMethodType: req.query
        .application_method_type as ApplicationMethodTypeValues,
      applicationMethodTargetType: req.query
        .application_method_target_type as ApplicationMethodTargetTypeValues,
    })[ruleType] || []

  res.json({
    attributes,
  })
}
