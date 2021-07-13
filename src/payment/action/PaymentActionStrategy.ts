export default interface PaymentActionStrategy {

  pay(paymentRequest: any): any;

  validation(paymentRequest: any): any;

  refund(paymentRequest: any): any;

  refundQuery(paymentRequest: any): any;

  paymentStatus(paymentRequest: any): any;

  ipnCheck(paymentRequest: any, paymentValidationResponse: any): any;

  success(paymentRequest: any): any;

  fail(paymentRequest: any): any;

  cancel(paymentRequest: any): any;
}
