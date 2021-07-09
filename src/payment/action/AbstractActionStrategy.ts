export default abstract class AbstractActionStrategy {


  checkValidation(request: Request): any {
  }

  checkPaymentType(request: any): any {
  }

  pay(paymentRequest: any): any {
  }

  validation(paymentRequest: any): any {
  }

  refund(paymentRequest: any): any {
  }

  refundQuery(paymentRequest: any): any {
  }

  paymentStatus(paymentRequest: any): any {
  }

  ipnCheck(paymentRequest: any): any {
  }

  success(paymentRequest: any): any {
  }

  fail(paymentRequest: any): any {
  }

  cancel(paymentRequest: any): any {
  }
}
