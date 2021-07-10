export default class SslcommerzPaymentSuccessService {

  static execute(response: any) {
    return {tran_id:response.tran_id}
  }
}
