import { SSLCommerzSuccessFailCancelIPNResponse } from '../../requests/payment.request';
import { SslCommerzPayment } from 'sslcommerz';

export default class SslcommerzPaymentValidation {
  constructor() {
  }

  async execute({ val_id }: SSLCommerzSuccessFailCancelIPNResponse, sslcommerzPaymentService: SslCommerzPayment) {
    return sslcommerzPaymentService.validate({ val_id }) as SSLCommerzSuccessFailCancelIPNResponse;
  }
}
