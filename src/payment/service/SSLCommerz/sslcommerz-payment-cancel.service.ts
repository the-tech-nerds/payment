
export default class SslcommerzPaymentCancelService {

  static execute(response: any) {
    return { tran_id: response.tran_id };
  }
}
