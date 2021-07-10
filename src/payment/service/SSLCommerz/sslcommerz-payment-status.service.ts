import { getMongoManager } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { Status } from '../../enum/payment-type.enum';

export default class SslcommerzPaymentStatusService {

  static async execute(validationResponse: any, paymentRequest: any) {
    if (validationResponse.APIConnect == 'DONE') {
      if (validationResponse.no_of_trans_found == 0 && (validationResponse.element[0].status == 'VALID' || validationResponse.element[0].status == 'VALIDATED')) {
        await getMongoManager().updateOne(Payment, { tran_id: validationResponse.tran_id }, {
          status: Status.valid.toUpperCase(),
        });
      }
    }
    const payment = await getMongoManager().findOne(Payment, { tran_id: paymentRequest.tran_id });
    return {
      status: payment?.status || validationResponse.element[0].status,
      tran_id: payment?.val_id || validationResponse.element[0].tran_id,
      amount: payment?.amount || validationResponse.element[0].amount,
      store_amount: payment?.store_amount || validationResponse.element[0].store_amount,
    };
  }
}
