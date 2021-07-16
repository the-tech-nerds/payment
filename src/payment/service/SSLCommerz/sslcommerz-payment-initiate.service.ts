import { PaymentRequest, PaymentResponse, SSLCommerzInitiateResponse } from '../../requests/payment.request';
import { HttpStatus } from '@nestjs/common';
import { SslCommerzPayment } from 'sslcommerz';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../enum/payment-type.enum';

export default class SslcommerzPaymentInitiateService {

  constructor(@InjectRepository(Payment)
              private paymentRepository: Repository<Payment>) {
  }

  async execute<T>(paymentRequest: PaymentRequest, sslcommerzService: SslCommerzPayment): Promise<PaymentResponse<T>> {

    const paymentEntity = await this.paymentRepository.findOne({ tran_id: paymentRequest.tran_id });
    console.log(paymentEntity);
    if (paymentEntity) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'Please provide unique transaction id',
        data: {} as unknown as T,
      } as PaymentResponse<T>;
    }

    let resp: SSLCommerzInitiateResponse;
    resp = await sslcommerzService.init({
      total_amount: paymentRequest.total_amount,
      tran_id: paymentRequest.tran_id,
      currency: paymentRequest.currency,
      ...paymentRequest.customer,
      ...paymentRequest.product_info,
      ...paymentRequest.shipping,
      ...paymentRequest.additional_parameters,
    }) as SSLCommerzInitiateResponse;
    this.paymentInitiateDataStore(resp, paymentRequest);
    if (resp?.status?.toLowerCase() == 'success') {
      return {
        code: HttpStatus.OK,
        message: 'Payment initiate successfully',
        data: resp as unknown as T,
      } as PaymentResponse<T>;

    } else {

      return {
        code: HttpStatus.BAD_REQUEST,
        message: resp.failedreason || 'Payment initiate failed',
        data: {} as unknown as T,
      } as PaymentResponse<T>;
    }
  }

  async paymentInitiateDataStore(resp: any, paymentRequest: PaymentRequest) {
    await this.paymentRepository.save({
      payment_type: paymentRequest.payment_type,
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      tran_id: paymentRequest.tran_id,
      session_key: resp.sessionkey,
      amount: paymentRequest.total_amount,
      currency: paymentRequest.currency,
      status: resp.status.toLowerCase() == 'success' ? Status.initiated : Status.failed,
      payment_init_failed_reason: resp.failedreason,
    });
  }

}
