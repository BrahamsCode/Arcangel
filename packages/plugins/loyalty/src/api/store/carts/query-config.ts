import { defaultStoreCartFields } from "@arcangel/arcangel/api/store/carts/query-config";

export const retrieveTransformQueryConfig = {
  defaults: [...defaultStoreCartFields, "*gift_cards"],
  isList: false,
};
