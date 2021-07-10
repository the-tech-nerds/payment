import { getMongoManager } from 'typeorm';
import { Payment } from '../../entities/payment.entity';

export default class SslcommerzPaymentIpnService {

  static execute(ipnResponse: any, validationResponse: any) {
    getMongoManager().updateOne(Payment, { tran_id: ipnResponse.tran_id }, {
      amount: ipnResponse.amount,
      currency: ipnResponse.currency,
      currency_type: ipnResponse.currency_type,
      status: ipnResponse.status,
      store_amount: ipnResponse.store_amount,
      tran_date: ipnResponse.tran_date,
      tran_id: ipnResponse.tran_id,
      updated_at: ipnResponse.updated_at,
      val_id: ipnResponse.val_id,
      payment_info: {
        bank_tran_id: ipnResponse.bank_tran_id,
        card_brand: ipnResponse.card_brand,
        card_issuer: ipnResponse.card_issuer,
        card_issuer_country: ipnResponse.card_issuer_country,
        card_issuer_country_code: ipnResponse.card_issuer_country_code,
        card_no: ipnResponse.card_no,
        card_type: ipnResponse.card_type,
        currency_amount: ipnResponse.currency_amount,
        discount_amount: ipnResponse.discount_amount ?? 0.0,
        discount_percentage: ipnResponse.discount_percentage,
        discount_remarks: ipnResponse.discount_remarks,
        emi_amount: ipnResponse.emi_amount,
        emi_instalment: ipnResponse.emi_instalment,
        risk_level: ipnResponse.risk_level,
        risk_title: ipnResponse.risk_title,
        verify_sign: ipnResponse.verify_sign,
        verify_sign_sha2: ipnResponse.verify_sign_sha2,
      },
    });
    if (ipnResponse.risk_level == 1) {
      return {
        message: 'This is a high risk transaction',
      };
    }
    if (ipnResponse.status != 'VALID' || validationResponse.status != 'VALID' || validationResponse.amount != ipnResponse.amount) {
      return {
        message: 'This is a invalid transaction amount miss match or not valid status',
      };
    }
    // @todo provide the service and call queue
    return {
      message: 'payment check and it\'s a success transaction',
    };
  }
}
