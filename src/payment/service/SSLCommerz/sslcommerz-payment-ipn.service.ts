import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';

export default class SslcommerzPaymentIpnService {

  static execute(response: any, paymentRepository: Repository<Payment>) {

  }
}