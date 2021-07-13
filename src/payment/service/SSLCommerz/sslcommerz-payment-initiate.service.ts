import { getMongoManager } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { Status } from '../../enum/payment-type.enum';
import { SSLCommerzResponse } from '../../requests/payment.request';

export default class SslcommerzPaymentInitiateService {

  static async execute(response: any, paymentRequest: any) {
    let process_response: any = {};
    const payment = new Payment();
    const tempPayment = await getMongoManager().findOne(Payment, { tran_id: paymentRequest.tran_id });
    if (tempPayment) {
      process_response.payment_init_failed_reason = 'Duplicate transaction is provided';
      return process_response;
    }
    payment.gateway_type = paymentRequest?.payment_type;
    payment.store_id = paymentRequest?.store_id;
    payment.tran_id = paymentRequest?.tran_id;
    payment.amount = paymentRequest?.total_amount;
    payment.service_status = Status.processing;
    payment.status = Status.initiated;
    payment.service_status = paymentRequest?.total_amount;
    if (response?.status == 'SUCCESS') {
      payment.session_key = response?.sessionkey;
      payment.payment_info = { card_no: response?.sessionkey };
      process_response = response;
      process_response.is_success = true;
    } else {
      payment.payment_init_failed_reason = response?.failedreason;
      process_response.payment_init_failed_reason = response?.failedreason;
    }
    getMongoManager().save(payment);
    return { a: 10 } as unknown as SSLCommerzResponse;
  }
}
