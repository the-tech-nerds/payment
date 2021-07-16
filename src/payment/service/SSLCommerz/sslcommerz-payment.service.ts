import { Injectable } from '@nestjs/common';
import { SslCommerzPayment } from 'sslcommerz';
import PaymentActionStrategy from '../../action/PaymentActionStrategy';
import SslcommerzPaymentInitiateService from './sslcommerz-payment-initiate.service';
import SslcommerzPaymentSuccessService from './sslcommerz-payment-success.service';
import {
  PaymentResponse,
  PaymentRequest,
  SSLCommerzSuccessFailCancelIPNResponse, SSLCommerzRefundInitiateRequest, RefundQueryRequest, PaymentStatusRequest,
} from '../../requests/payment.request';
import AbstractActionStrategy from '../../action/abstract-action-strategy';
import SslcommerzPaymentFailService from './sslcommerz-payment-fail.service';
import SslcommerzPaymentCancelService from './sslcommerz-payment-cancel.service';
import SslcommerzPaymentIpnService from './sslcommerz-payment-ipn.service';
import SslcommerzPaymentStatusService from './sslcommerz-payment-status.service';
import SslcommerzPaymentRefundInitiateService from './sslcommerz-payment-refund-initiate.service';
import SslcommerzPaymentRefundQueryService from './sslcommerz-payment-refund-query.service';


@Injectable()
export class SslcommerzPaymentService<T> extends AbstractActionStrategy<T> implements PaymentActionStrategy<T> {
  sslcommerzService: SslCommerzPayment;

  constructor(
    private readonly sslcommerzPaymentInitiateService: SslcommerzPaymentInitiateService,
    private readonly sslcommerzPaymentCancelService: SslcommerzPaymentCancelService,
    private readonly sslcommerzPaymentFailService: SslcommerzPaymentFailService,
    private readonly sslcommerzPaymentSuccessService: SslcommerzPaymentSuccessService,
    private readonly sslcommerzPaymentIpnService: SslcommerzPaymentIpnService,
    private readonly sslcommerzPaymentStatusService: SslcommerzPaymentStatusService,
    private readonly sslcommerzPaymentRefundInitiateService: SslcommerzPaymentRefundInitiateService,
    private readonly sslcommerzPaymentRefundQueryService: SslcommerzPaymentRefundQueryService,
  ) {
    super();
    this.sslcommerzService = new SslCommerzPayment(process.env.SSLCOMMERZ_STORE_ID, process.env.SSLCOMMERZ_STORE_PASSWORD, process.env.SSLCOMMERZ_STORE_IS_LIVE !== 'false');

  }

  async pay(paymentRequest: PaymentRequest): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentInitiateService.execute<T>(paymentRequest, this.sslcommerzService);
  }

  async cancel(paymentCancelResponse: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentCancelService.execute<T>(paymentCancelResponse);
  }

  async success(paymentSuccessResponse: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentSuccessService.execute<T>(paymentSuccessResponse);
  }

  async fail(paymentFailResponse: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentFailService.execute<T>(paymentFailResponse);
  }

  async ipnCheck(ipnRequest: SSLCommerzSuccessFailCancelIPNResponse): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentIpnService.execute<T>(ipnRequest, this.sslcommerzService);
  }

  async paymentStatus(paymentStatusRequest: PaymentStatusRequest): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentStatusService.execute<T>(paymentStatusRequest, this.sslcommerzService);
  }

  async refund(paymentRequest: SSLCommerzRefundInitiateRequest): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentRefundInitiateService.execute<T>(paymentRequest, this.sslcommerzService);
  }

  refundQuery(sslcommerzRefundQueryRequest: RefundQueryRequest): Promise<PaymentResponse<T>> {
    return this.sslcommerzPaymentRefundQueryService.execute<T>(sslcommerzRefundQueryRequest, this.sslcommerzService);
  }
}
