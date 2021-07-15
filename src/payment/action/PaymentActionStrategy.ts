import { PaymentResponse, PaymentRequest } from '../requests/payment.request';

export default interface PaymentActionStrategy<T> {
  pay(paymentRequest: PaymentRequest): Promise<PaymentResponse<T>>;
  //
  // validation(paymentRequest: any): any;
  //
  // refund(paymentRequest: any): any;
  //
  // refundQuery(paymentRequest: any): any;
  //
  // paymentStatus(paymentRequest: any): any;
  //
  // ipnCheck(paymentRequest: any, paymentValidationResponse: any): any;

  success(paymentRequest: any): any;
  //
  // fail(paymentRequest: any): any;
  //
  // cancel(paymentRequest: any): any;
}
