import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentRequest } from '../requets/payment.request';

@Injectable()
export class InitPaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(userId: number, paymentRequest: PaymentRequest): Promise<Payment> {
    return this.paymentRepository.save(paymentRequest);
  }
}
