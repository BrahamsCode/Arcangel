import { ArcangelStoreRequest } from "@arcangel/framework/http"
import {
  ArcangelPricingContext,
  TaxCalculationContext,
} from "@arcangel/framework/types"

export type StoreRequestWithContext<
  Body,
  QueryFields = Record<string, unknown>
> = ArcangelStoreRequest<Body, QueryFields> & {
  pricingContext?: ArcangelPricingContext
  taxContext?: {
    taxLineContext?: TaxCalculationContext
    taxInclusivityContext?: {
      automaticTaxes: boolean
    }
  }
}
