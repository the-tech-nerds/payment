import {
  PaymentResponse,
  PaymentRequest,
  SSLCommerzSuccessFailCancelIPNResponse,
  SSLCommerzRefundInitiateRequest,
} from '../requests/payment.request';

export default interface PaymentActionStrategy<T> {
  pay(paymentRequest: PaymentRequest): Promise<PaymentResponse<T>>;

  refund(paymentRequest: SSLCommerzRefundInitiateRequest): Promise<PaymentResponse<T>>;

  refundQuery(paymentRequest: any): Promise<PaymentResponse<T>>;

  paymentStatus(paymentRequest: any): Promise<PaymentResponse<T>>;

  ipnCheck(paymentRequest: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>>;

  success(paymentRequest: SSLCommerzSuccessFailCancelIPNResponse): any;

  fail(paymentRequest: SSLCommerzSuccessFailCancelIPNResponse): any;

  cancel(paymentRequest: SSLCommerzSuccessFailCancelIPNResponse): any;
}
