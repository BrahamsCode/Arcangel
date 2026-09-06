import { defineLink } from "@arcangel/framework/utils"
import ProductModule from "@arcangel/arcangel/product"
import Translation from "../modules/translation"

export default defineLink(
  ProductModule.linkable.product.id,
  Translation.linkable.translation.id
)
