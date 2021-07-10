export default class SslcommerzPaymentFailService {

  static execute(response: any) {
    return {tran_id:response.tran_id}
  }
}
