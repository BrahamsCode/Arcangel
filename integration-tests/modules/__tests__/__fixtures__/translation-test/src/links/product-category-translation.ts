import ProductModule from "@arcangel/arcangel/product"
import { defineLink } from "@arcangel/utils"
import Translation from "../modules/translation"

export default defineLink(
  ProductModule.linkable.productCategory.id,
  Translation.linkable.translation.id
)
