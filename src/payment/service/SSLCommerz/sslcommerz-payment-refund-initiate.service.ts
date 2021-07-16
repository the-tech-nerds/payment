import { SslCommerzPayment } from 'sslcommerz';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import {
  PaymentResponse, SSLCommerzRefundInitiateRequest,
  SSLCommerzRefunIntiateResponse,
} from '../../requests/payment.request';

export default class SslcommerzPaymentRefundInitiateService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
  }

  async execute<T>(paymentRequest: SSLCommerzRefundInitiateRequest, sslcommerzService: SslCommerzPayment): Promise<PaymentResponse<T>> {
    const payment = await this.paymentRepository.findOne({ tran_id: paymentRequest.tran_id });
    if (!payment) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Transaction did not found',
        data: null,
      } as unknown as Promise<PaymentResponse<T>>;
    }
    const resp = await sslcommerzService.initiateRefund({
      tran_id: paymentRequest.tran_id, refund_amount: payment.amount,
      refund_remarks: payment.id,
      bank_tran_id: payment?.payment_info?.bank_tran_id,
      refe_id: payment.id,
    }) as SSLCommerzRefunIntiateResponse;
    if (resp.APIConnect === 'DONE' && resp.status == 'success') {
      await this.paymentRepository.update({ tran_id: paymentRequest.tran_id }, {
        payment_info: {
          bank_tran_id: resp.bank_tran_id,
          refund_ref_id: resp.bank_tran_id,
          refund_error_reason: resp.errorReason,
          // @ts-ignore
          refund_initiated_on: new Date(),
          refund_status: resp.status,
        },
      });
      return {
        code: HttpStatus.OK,
        message: 'Refund request initiate successfully',
        data: resp as SSLCommerzRefunIntiateResponse,
      } as unknown as Promise<PaymentResponse<T>>;
    } else {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Refund request initiate failed',
        data: resp as SSLCommerzRefunIntiateResponse,
      } as unknown as Promise<PaymentResponse<T>>;
    }
  }
}
