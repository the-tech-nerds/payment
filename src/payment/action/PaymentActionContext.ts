import PaymentActionStrategy from './PaymentActionStrategy';
import { PaymentResponse } from '../requests/payment.request';
import { PaymentRequest } from '../requests/payment.request';

export default class PaymentActionContext<T> {
  constructor(private strategy: PaymentActionStrategy<T>) {
  }

  pay(request: PaymentRequest): Promise<PaymentResponse<T>> {
    return this.strategy.pay(request);
  }

  validation(request: any) {
    return this.strategy.validation(request);
  }

  refund(request: any) {
    return this.strategy.refund(request);
  }

  refundQuery(request: any) {
    return this.strategy.refundQuery(request);
  }

  paymentStatus(request: any) {
    return this.strategy.paymentStatus(request);
  }

  ipnCheck(ipnResponse: any, validationResponse: any) {
    return this.strategy.ipnCheck(ipnResponse, validationResponse);
  }

  success(request: any) {
    return this.strategy.success(request);
  }

  fail(request: any) {
    return this.strategy.fail(request);
  }

  cancel(request: any) {
    return this.strategy.cancel(request);
  }
}
