import ProductModule from "@arcangel/arcangel/product"
import { defineLink } from "@arcangel/utils"
import Translation from "../modules/translation"

export default defineLink(
  ProductModule.linkable.productVariant.id,
  Translation.linkable.translation.id
)
