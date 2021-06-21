import { Injectable } from '@nestjs/common';
import { PaymentRequest } from '../requets/payment.request';

@Injectable()
export class InitPaymentService {
  constructor(
    // @InjectRepository(Payment)
    // private paymentRepository: Repository<Payment>,
  ) {}

  async create(userId: number, paymentRequest: PaymentRequest): Promise<any> {
    // return this.paymentRepository.save(paymentRequest);
    return ['Rana'];
  }
}
