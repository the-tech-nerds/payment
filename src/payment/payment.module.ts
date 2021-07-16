import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { PaymentController } from './controller/payment.controller';
import { Payment } from './entities/payment.entity';
import { SslcommerzPaymentService } from './service/SSLCommerz/sslcommerz-payment.service';
import { PaymentResolver } from './action/payment-resolver';
import SslcommerzPaymentInitiateService from './service/SSLCommerz/sslcommerz-payment-initiate.service';
import SslcommerzPaymentSuccessService from './service/SSLCommerz/sslcommerz-payment-success.service';
import SslcommerzPaymentCancelService from './service/SSLCommerz/sslcommerz-payment-cancel.service';
import SslcommerzPaymentFailService from './service/SSLCommerz/sslcommerz-payment-fail.service';
import SslcommerzPaymentIpnService from './service/SSLCommerz/sslcommerz-payment-ipn.service';
import SslcommerzPaymentStatusService from './service/SSLCommerz/sslcommerz-payment-status.service';
import SslcommerzPaymentValidation from './service/SSLCommerz/sslcommerz-payment-validation.service';
import SslcommerzPaymentRefundInitiateService from './service/SSLCommerz/sslcommerz-payment-refund-initiate.service';
import SslcommerzPaymentRefundQueryService from './service/SSLCommerz/sslcommerz-payment-refund-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [
    ApiResponseService,
    PaymentResolver,
    SslcommerzPaymentService,
    SslcommerzPaymentInitiateService,
    SslcommerzPaymentCancelService,
    SslcommerzPaymentFailService,
    SslcommerzPaymentSuccessService,
    SslcommerzPaymentIpnService,
    SslcommerzPaymentStatusService,
    SslcommerzPaymentValidation,
    SslcommerzPaymentRefundInitiateService,
    SslcommerzPaymentRefundQueryService
  ],
  controllers: [PaymentController],
  exports: [],
})
export class PaymentModule {
}
