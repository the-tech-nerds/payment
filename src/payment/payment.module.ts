import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { PaymentController } from './controller/payment.controller';
import { Payment } from './entities/payment.entity';
import { SslcommerzPaymentService } from './service/SSLCommerz/sslcommerz-payment.service';
import { PaymentResolver } from './action/payment-resolver';
import SslcommerzPaymentInitiateService from './service/SSLCommerz/sslcommerz-payment-initiate.service';
import SslcommerzPaymentSuccessService from './service/SSLCommerz/sslcommerz-payment-success.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [
    ApiResponseService,
    PaymentResolver,
    SslcommerzPaymentService,
    SslcommerzPaymentInitiateService,
    SslcommerzPaymentSuccessService,
  ],
  controllers: [PaymentController],
  exports: [],
})
export class PaymentModule {
}
