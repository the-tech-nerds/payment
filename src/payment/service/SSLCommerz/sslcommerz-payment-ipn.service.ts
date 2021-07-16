import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentResponse, SSLCommerzSuccessFailCancelIPNResponse } from '../../requests/payment.request';
import SslcommerzPaymentValidation from './sslcommerz-payment-validation.service';
import { HttpStatus } from '@nestjs/common';
import { SslCommerzPayment } from 'sslcommerz';
import { Status } from '../../enum/payment-type.enum';

export default class SslcommerzPaymentIpnService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private readonly sslcommerzPaymentValidation: SslcommerzPaymentValidation,
  ) {
  }

  async execute<T>(ipnResponse: SSLCommerzSuccessFailCancelIPNResponse, sslcommerzService: SslCommerzPayment) : Promise<PaymentResponse<T>> {
    const payment = await this.paymentRepository.findOne({ tran_id: ipnResponse.tran_id });
    if (!payment) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Transaction did not found',
        data: null,
      } as unknown as Promise<PaymentResponse<T>>;
    }
    if (payment?.status?.toUpperCase() === Status.valid) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Transaction did not found',
        data: null,
      } as unknown as Promise<PaymentResponse<T>>;
    }
    const validationResponse = await this.sslcommerzPaymentValidation.execute(ipnResponse, sslcommerzService);
    if (validationResponse?.APIConnect?.toLowerCase() == 'done' && ['VALID', 'VALIDATE'].includes(validationResponse.status) && validationResponse.amount === ipnResponse.amount && ipnResponse.risk_level !== 0) {
      this.saveIPN(ipnResponse, validationResponse, Status.valid);
      return {
        code: HttpStatus.OK,
        message: 'This a valid transaction.',
        data: validationResponse,
      } as unknown as Promise<PaymentResponse<T>>;
    } else {
      this.saveIPN(ipnResponse, validationResponse, Status.failed);
      return {
        code: HttpStatus.OK,
        message: `This a invalid transaction the api and validation data miss-match and risk level ${validationResponse.risk_level}`,
        data: validationResponse,
      } as unknown as Promise<PaymentResponse<T>>;
    }
  }

  async saveIPN(ipnResponse: SSLCommerzSuccessFailCancelIPNResponse, validationResponse: any, status: string) {
    await this.paymentRepository.update({ tran_id: ipnResponse.tran_id }, {
      status: status,
      store_amount: ipnResponse.store_amount,
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
  }
}
