
import { PaymentResponse, SSLCommerzSuccessResponse } from '../../requests/payment.request';

export default class SslcommerzPaymentSuccessService {

  constructor(
    // @InjectRepository(Payment)
    //           private paymentRepository: Repository<Payment>
  ) {
  }

  execute<T>(sslcommerzSuccessResponse: SSLCommerzSuccessResponse): Promise<PaymentResponse<T>> {
    return sslcommerzSuccessResponse as Promise<PaymentResponse<T>>;
  }
}
