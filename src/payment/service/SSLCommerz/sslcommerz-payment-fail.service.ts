import { PaymentResponse, SSLCommerzSuccessFailCancelResponse } from '../../requests/payment.request';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';

export default class SslcommerzPaymentFailService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
  }
  async execute<T>(sslcommerzFailResponse: SSLCommerzSuccessFailCancelResponse): Promise<PaymentResponse<T>> {
    const paymentEntry = this.paymentRepository.findOne({
      tran_id: sslcommerzFailResponse.tran_id,
    });
    let url = '';
    if (sslcommerzFailResponse.value_a.includes('?')) {
      url = sslcommerzFailResponse.value_a+`&status=${sslcommerzFailResponse.status}&tran_id${sslcommerzFailResponse.tran_id}`
    } else {
      url = sslcommerzFailResponse.value_a+`?status=${sslcommerzFailResponse.status}&tran_id${sslcommerzFailResponse.tran_id}`
    }
    if (!paymentEntry) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Transaction not found',
        data: url,
      } as unknown as Promise<PaymentResponse<T>>;
    }
    await this.paymentRepository.update({ tran_id: sslcommerzFailResponse.tran_id }, {
      // @ts-ignore
      fail_time: new Date(),
    });
    return {
      code: HttpStatus.OK,
      message: 'This a valid transaction',
      data: url,
    } as unknown as Promise<PaymentResponse<T>>;
  }
}
