import { Injectable } from '@nestjs/common';
import { SslCommerzPayment } from 'sslcommerz';
import PaymentActionStrategy from '../../action/PaymentActionStrategy';
import SslcommerzPaymentInitiateService from './sslcommerz-payment-initiate.service';
import SslcommerzPaymentSuccessService from './sslcommerz-payment-success.service';
import { PaymentResponse, PaymentRequest, SSLCommerzSuccessResponse } from '../../requests/payment.request';
import AbstractActionStrategy from '../../action/abstract-action-strategy';


@Injectable()
export class SslcommerzPaymentService<T> extends AbstractActionStrategy<T> implements PaymentActionStrategy<T> {
  sslcommerzService: SslCommerzPayment;

  constructor(
    private readonly sslcommerzPaymentInitiateService: SslcommerzPaymentInitiateService,
    // private readonly sslcommerzPaymentCancelService: SslcommerzPaymentCancelService,
    private readonly sslcommerzPaymentSuccessService: SslcommerzPaymentSuccessService
  ) {
    super();
    this.sslcommerzService = new SslCommerzPayment(process.env.SSLCOMMERZ_STORE_ID, process.env.SSLCOMMERZ_STORE_PASSWORD, process.env.SSLCOMMERZ_STORE_IS_LIVE !== 'false');

  }

  async pay(paymentRequest: PaymentRequest): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentInitiateService.execute<T>(paymentRequest, this.sslcommerzService);
  }

 /* async cancel(paymentResponse: any): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentCancelService.execute(paymentResponse);
  }*/

  async success(successResponse: SSLCommerzSuccessResponse): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentSuccessService.execute<T>(successResponse);
  }
/*
  async fail(paymentResponse: any): Promise<PaymentResponse<T>> {
    return SslcommerzPaymentFailService.execute(paymentResponse);
  }

  async ipnCheck(paymentResponse: any, paymentValidationResponse: any): Promise<PaymentResponse<T>> {
    return SslcommerzPaymentIpnService.execute(paymentResponse, paymentValidationResponse);
  }

  async validation(paymentRequest: any): Promise<PaymentResponse<T>> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.validate({ val_id: paymentRequest.val_id });
    return SslcommerzPaymentValidation.execute(resp);
  }

  async refund(paymentRequest: any): Promise<PaymentResponse<T>> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.initiateRefund(paymentRequest);
    return SslcommerzPaymentRefundInitiateService.execute(resp, paymentRequest);
  }

  async refundQuery(paymentRequest: any): Promise<PaymentResponse<T>> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.refundQuery(paymentRequest);
    return SslcommerzPaymentRefundQueryService.execute(resp, paymentRequest);
  }

  async paymentStatus(paymentRequest: any): Promise<PaymentResponse<T>> {
    this.sslcommerzService = new SslCommerzPayment(paymentRequest.store_id, paymentRequest.store_passwd, paymentRequest.is_live);
    const resp = await this.sslcommerzService.transactionQueryByTransactionId(paymentRequest);
    return SslcommerzPaymentStatusService.execute(resp, paymentRequest);
  }*/
}
