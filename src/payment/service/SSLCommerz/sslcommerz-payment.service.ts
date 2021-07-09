import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { SslCommerzPayment } from 'sslcommerz';
import AbstractActionStrategy from '../../action/AbstractActionStrategy';
import PaymentActionStrategy from '../../action/PaymentActionStrategy';
import SslcommerzPaymentInitiateService from './sslcommerz-payment-initiate.service';
import SslcommerzPaymentCancelService from './sslcommerz-payment-cancel.service';
import SslcommerzPaymentSuccessService from './sslcommerz-payment-success.service';
import SslcommerzPaymentFailService from './sslcommerz-payment-fail.service';
import SslcommerzPaymentIpnService from './sslcommerz-payment-ipn.service';
import SslcommerzPaymentValidation from './sslcommerz-payment-validation.service';
import SslcommerzPaymentRefundInitiateService from './sslcommerz-payment-refund-initiate.service';
import SslcommerzPaymentRefundQueryService from './sslcommerz-payment-refund-query.service';
import SslcommerzPaymentStatusService from './sslcommerz-payment-status.service';


@Injectable()
export class SslcommerzPaymentService extends AbstractActionStrategy implements PaymentActionStrategy {
  sslcommerzService: SslCommerzPayment;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    super();
  }

  async pay(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.init(paymentRequest);
    return SslcommerzPaymentInitiateService.execute(resp, this.paymentRepository);
  }

  async cancel(paymentResponse: any): Promise<any> {
    return SslcommerzPaymentCancelService.execute(paymentResponse, this.paymentRepository);
  }

  async success(paymentResponse: any): Promise<any> {
    return SslcommerzPaymentSuccessService.execute(paymentResponse, this.paymentRepository);
  }

  async fail(paymentResponse: any): Promise<any> {
    return SslcommerzPaymentFailService.execute(paymentResponse, this.paymentRepository);
  }

  async ipnCheck(paymentResponse: any): Promise<any> {
    return SslcommerzPaymentIpnService.execute(paymentResponse, this.paymentRepository);
  }

  async validation(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.validate(paymentRequest);
    return SslcommerzPaymentValidation.execute(resp, this.paymentRepository);
  }

  async refund(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.initiateRefund(paymentRequest);
    return SslcommerzPaymentRefundInitiateService.execute(resp, this.paymentRepository);
  }

  async refundQuery(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.refundQuery(paymentRequest);
    return SslcommerzPaymentRefundQueryService.execute(resp, this.paymentRepository);
  }

  async paymentStatus(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.transactionQueryByTransactionId(paymentRequest);
    return SslcommerzPaymentStatusService.execute(resp, this.paymentRepository);
  }
}
