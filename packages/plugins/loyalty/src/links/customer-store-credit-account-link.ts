import { defineLink } from "@arcangel/framework/utils";
import CustomerModule from "@arcangel/arcangel/customer";
import StoreCreditModule from "../modules/store-credit";

defineLink(
  {
    linkable: StoreCreditModule.linkable.storeCreditAccount,
    field: "customer_id",
  },
  CustomerModule.linkable.customer,
  { readOnly: true, isList: false }
);
