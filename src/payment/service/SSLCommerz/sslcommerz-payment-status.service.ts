import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { Status } from '../../enum/payment-type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { SslCommerzPayment } from 'sslcommerz';
import { HttpStatus } from '@nestjs/common';
import { PaymentResponse, PaymentStatusRequest } from '../../requests/payment.request';

export default class SslcommerzPaymentStatusService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
  }

  async execute<T>(paymentStatusRequest: PaymentStatusRequest, sslcommerzPaymentService: SslCommerzPayment): Promise<PaymentResponse<T>> {

    const paymentStatusResponse = await sslcommerzPaymentService.transactionQueryByTransactionId({ tran_id: paymentStatusRequest.tran_id });

    if (paymentStatusResponse.APIConnect == 'DONE') {
      if (paymentStatusResponse.no_of_trans_found == 0 && (['VALID', 'VALIDATED'].includes(paymentStatusResponse.element[0].status))) {
        await this.paymentRepository.update({ tran_id: paymentStatusResponse.tran_id }, {
          status: Status.valid.toUpperCase(),
        });
      }
    }
    return {
      code: HttpStatus.OK,
      message: 'This a valid transaction',
      data: paymentStatusResponse,
    } as unknown as Promise<PaymentResponse<T>>;
  }
}
