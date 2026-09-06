import { ChangeActionType, ArcangelError } from "@arcangel/framework/utils"
import { OrderChangeProcessing } from "../calculate-order-change"

OrderChangeProcessing.registerActionType(ChangeActionType.SHIPPING_UPDATE, {
  operation({ action, currentOrder, options }) {
    // no-op
  },
  validate({ action }) {
    if (!action.reference_id) {
      throw new ArcangelError(
        ArcangelError.Types.INVALID_DATA,
        "Reference ID is required."
      )
    }
  },
})
