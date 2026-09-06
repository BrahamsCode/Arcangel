import {
  ArcangelContainer,
  PaymentCollectionDTO,
} from "@arcangel/framework/types"
import { refetchEntity } from "@arcangel/framework/http"

export const refetchPaymentCollection = async (
  id: string,
  scope: ArcangelContainer,
  fields: string[]
): Promise<PaymentCollectionDTO> => {
  return refetchEntity({
    entity: "payment_collection",
    idOrFilter: id,
    scope,
    fields,
  })
}
