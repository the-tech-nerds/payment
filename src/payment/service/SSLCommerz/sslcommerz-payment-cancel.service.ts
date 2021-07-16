import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentResponse, SSLCommerzSuccessFailCancelIPNResponse } from '../../requests/payment.request';
import { HttpStatus } from '@nestjs/common';

export default class SslcommerzPaymentCancelService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
  }

  async execute<T>(sslcommerzCancelResponse: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>> {
    const paymentEntry = this.paymentRepository.findOne({
      tran_id: sslcommerzCancelResponse.tran_id,
    });
    let url = '';
    if (sslcommerzCancelResponse.value_a.includes('?')) {
      url = sslcommerzCancelResponse.value_a + `&status=${sslcommerzCancelResponse.status}&tran_id${sslcommerzCancelResponse.tran_id}`;
    } else {
      url = sslcommerzCancelResponse.value_a + `?status=${sslcommerzCancelResponse.status}&tran_id${sslcommerzCancelResponse.tran_id}`;
    }
    if (!paymentEntry) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Transaction not found',
        data: url,
      } as unknown as Promise<PaymentResponse<T>>;
    }
    await this.paymentRepository.update({ tran_id: sslcommerzCancelResponse.tran_id }, {
      // @ts-ignore
      cancel_time: new Date(),
    });
    return {
      code: HttpStatus.OK,
      message: 'This a valid transaction',
      data: url,
    } as unknown as Promise<PaymentResponse<T>>;
  }
}
