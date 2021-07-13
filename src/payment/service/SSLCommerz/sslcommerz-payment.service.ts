import { Injectable } from '@nestjs/common';
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

  constructor() {
    super();
  }

  async pay(paymentRequest: any): Promise<any> {

    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.init(paymentRequest);

    return SslcommerzPaymentInitiateService.execute(resp, paymentRequest);
  }

  async cancel(paymentResponse: any): Promise<any> {
    return SslcommerzPaymentCancelService.execute(paymentResponse);
  }

  async success(paymentResponse: any): Promise<any> {
    return SslcommerzPaymentSuccessService.execute(paymentResponse);
  }

  async fail(paymentResponse: any): Promise<any> {
    return SslcommerzPaymentFailService.execute(paymentResponse);
  }

  async ipnCheck(paymentResponse: any, paymentValidationResponse: any): Promise<any> {
    return SslcommerzPaymentIpnService.execute(paymentResponse, paymentValidationResponse);
  }

  async validation(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.validate({ val_id: paymentRequest.val_id });
    return SslcommerzPaymentValidation.execute(resp);
  }

  async refund(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.initiateRefund(paymentRequest);
    return SslcommerzPaymentRefundInitiateService.execute(resp,paymentRequest);
  }

  async refundQuery(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.refundQuery(paymentRequest);
    return SslcommerzPaymentRefundQueryService.execute(resp, paymentRequest);
  }

  async paymentStatus(paymentRequest: any): Promise<any> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.transactionQueryByTransactionId(paymentRequest);
    return SslcommerzPaymentStatusService.execute(resp, paymentRequest);
  }
}
