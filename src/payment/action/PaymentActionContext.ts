import PaymentActionStrategy from './PaymentActionStrategy';
import {
  PaymentResponse, PaymentStatusRequest,
  SSLCommerzRefundInitiateRequest, RefundQueryRequest,
  SSLCommerzSuccessFailCancelIPNResponse,
} from '../requests/payment.request';
import { PaymentRequest } from '../requests/payment.request';

export default class PaymentActionContext<T> {
  constructor(private strategy: PaymentActionStrategy<T>) {
  }

  pay(request: PaymentRequest): Promise<PaymentResponse<T>> {
    return this.strategy.pay(request);
  }


  refund(request: SSLCommerzRefundInitiateRequest): Promise<PaymentResponse<T>> {
    return this.strategy.refund(request);
  }


  refundQuery(request: RefundQueryRequest) :Promise<PaymentResponse<T>>{
    return this.strategy.refundQuery(request);
  }

  paymentStatus(request: PaymentStatusRequest):Promise<PaymentResponse<T>> {
    return this.strategy.paymentStatus(request);
  }

  ipnCheck(ipnResponse: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>> {
    return this.strategy.ipnCheck(ipnResponse);
  }

  success(request: SSLCommerzSuccessFailCancelIPNResponse): any {
    return this.strategy.success(request);
  }

  fail(request: SSLCommerzSuccessFailCancelIPNResponse): any {
    return this.strategy.fail(request);
  }

  cancel(request: SSLCommerzSuccessFailCancelIPNResponse): any {
    return this.strategy.cancel(request);
  }
}
