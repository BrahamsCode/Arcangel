import stripe from "stripe"

export interface CreatePaymentRequest extends stripe.PaymentIntentCreateParams {
  account_holder_id?: string
  idempotency_key?: string
}

export interface ArcangelPayment extends stripe.PaymentIntent {
  account_holder_id?: string
}

export interface RefundPaymentRequest extends stripe.RefundCreateParams {
  idempotency_key?: string
}

export interface ArcangelRefund extends stripe.Refund {}

export interface CreateAccountHolderRequest
  extends stripe.CustomerCreateParams {}

export interface UpdateAccountHolderRequest
  extends stripe.CustomerUpdateParams {}

export interface ArcangelAccountHolder extends stripe.Customer {}

export interface ArcangelPaymentMethod extends stripe.PaymentMethod {
  account_holder_id?: string
}

export interface ArcangelPaymentMethodSession extends stripe.SetupIntent {}
