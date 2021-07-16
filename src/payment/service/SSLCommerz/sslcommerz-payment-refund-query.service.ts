import { SslCommerzPayment } from 'sslcommerz';
import {
  PaymentResponse,
  RefundQueryRequest,
  SSLCommerzRefundQueryResponse,
} from '../../requests/payment.request';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';

export default class SslcommerzPaymentRefundQueryService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
  }

  async execute<T>(sslcommerzRefundQueryRequest: RefundQueryRequest, sslcommerzService: SslCommerzPayment): Promise<PaymentResponse<T>> {

    const payment = await this.paymentRepository.findOne({ tran_id: sslcommerzRefundQueryRequest.tran_id });
    if (!payment) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Transaction not found',
        data: null,
      } as unknown as Promise<PaymentResponse<T>>;
    }
    const refundQueryResponse: SSLCommerzRefundQueryResponse = await sslcommerzService.refundQuery({
      refund_ref_id: payment.payment_info.refund_ref_id,
    });
    if (refundQueryResponse.APIConnect === 'DONE' && refundQueryResponse.status === 'refunded') {
      await this.paymentRepository.update({ tran_id: sslcommerzRefundQueryRequest.tran_id }, {
        payment_info: {
          refund_initiated_on: refundQueryResponse.initiated_on,
          refunded_on: refundQueryResponse.refunded_on,
          refund_ref_id: refundQueryResponse.refund_ref_id,
          refund_error_reason: refundQueryResponse.errorReason,
          refund_status: refundQueryResponse.status,
        },
      });
    }

    return {
      code: HttpStatus.NOT_FOUND,
      message: 'Transaction not found',
      data: refundQueryResponse,
    } as unknown as Promise<PaymentResponse<T>>;
  }
}
