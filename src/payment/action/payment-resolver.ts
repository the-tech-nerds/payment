import { SslcommerzPaymentService } from '../service/SSLCommerz/sslcommerz-payment.service';
import { PaymentType, SSLCommerzInitiateResponse } from '../requests/payment.request';
import PaymentActionContext from './PaymentActionContext';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentResolver {
   constructor(
       private sslCommerzPaymentService: SslcommerzPaymentService<SSLCommerzInitiateResponse>
   ) {
   }

   resolve(paymentType: PaymentType) {
     const paymentService = this.resolvePaymentService(paymentType);
     return new PaymentActionContext(paymentService);
    }

  resolvePaymentService(paymentType: PaymentType) {
    switch (paymentType) {
      default:
        return this.sslCommerzPaymentService;
    }
  }
}
