import { PaymentResponse, SSLCommerzSuccessFailCancelIPNResponse } from '../../requests/payment.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

export default class SslcommerzPaymentSuccessService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
  }

  async execute<T>(sslcommerzSuccessResponse: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>> {
    const paymentEntry = this.paymentRepository.findOne({
      tran_id: sslcommerzSuccessResponse.tran_id,
    });
    let url = '';
    if (sslcommerzSuccessResponse.value_a.includes('?')) {
      url = sslcommerzSuccessResponse.value_a+`&status=${sslcommerzSuccessResponse.status}&tran_id${sslcommerzSuccessResponse.tran_id}`
    } else {
      url = sslcommerzSuccessResponse.value_a+`?status=${sslcommerzSuccessResponse.status}&tran_id${sslcommerzSuccessResponse.tran_id}`
    }
    if (!paymentEntry) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Transaction not found',
        data: url,
      } as unknown as Promise<PaymentResponse<T>>;
    }
    await this.paymentRepository.update({ tran_id: sslcommerzSuccessResponse.tran_id }, {
      // @ts-ignore
      success_time: new Date(),
    });
    return {
      code: HttpStatus.OK,
      message: 'This a valid transaction',
      data: url,
    } as unknown as Promise<PaymentResponse<T>>;
  }
}
