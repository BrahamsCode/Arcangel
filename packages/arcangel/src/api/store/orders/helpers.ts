import { ArcangelContainer } from "@arcangel/framework/types"
import { refetchEntity } from "@arcangel/framework/http"

export const refetchOrder = async (
  idOrFilter: string | object,
  scope: ArcangelContainer,
  fields: string[]
) => {
  return await refetchEntity({ entity: "order", idOrFilter, scope, fields })
}
