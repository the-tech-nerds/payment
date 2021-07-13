import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiResponseService,
} from '@the-tech-nerds/common-services';
import { Response } from 'express';
import { Payment } from '../entities/payment.entity';
import { PaymentRequest } from '../requets/SSLCommerz/payment.request';
import PaymentActionContext from '../action/PaymentActionContext';
import { SslcommerzPaymentService } from '../service/SSLCommerz/sslcommerz-payment.service';

@Controller()
export class PaymentController {
  context: PaymentActionContext;

  constructor(
    private readonly sslcommerzPaymentService: SslcommerzPaymentService,
    private readonly apiResponseService: ApiResponseService,
  ) {
  }

  @Post('/')
  async createPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.pay(paymentRequest);

    if (!data.payment_init_failed_reason) {
      return this.apiResponseService.successResponse(
        ['Payment initiate successfully'],
        data,
        res,
      );
    } else {
      return this.apiResponseService.badRequestError(
        [data.payment_init_failed_reason || 'Payment initiate failed'],
        res,
      );
    }
    // return null;

  }

  @Post('/cancel')
  async cancelPayment(
    @Body() paymentRequest: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.cancel(paymentRequest);
    return this.apiResponseService.response(
      'Payment process is cancel',
      'fail',
      422,
      data,
      res,
    );
  }

  @Post('/fail')
  async failPayment(
    @Body() paymentFailRequest: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentFailRequest?.payment_type));
    const data = await this.context.fail(paymentFailRequest);
    return this.apiResponseService.response(
      'Payment process is fail',
      'fail',
      422,
      data,
      res,
    );
  }

  @Post('/success')
  async successPayment(
    @Body() paymentSuccessRequest: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentSuccessRequest?.payment_type));
    const data = await this.context.success(paymentSuccessRequest);
    return this.apiResponseService.successResponse(
      ['Payment process successfully done'],
      data,
      res,
    );
  }

  @Post('/ipn')
  async ipnPayment(
    @Body() paymentIpnRequest: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    // @ts-ignore
    paymentIpnRequest?.payment_type = 'sslcommerz';
    // @ts-ignore
    paymentIpnRequest?.store_passwd = PaymentController.getStoreInfo(paymentIpnRequest.store_id);
    this.context = new PaymentActionContext(this.getPaymentService(paymentIpnRequest?.payment_type));
    const paymentValidationResponse = await this.context.validation(paymentIpnRequest);
    const data = await this.context.ipnCheck(paymentIpnRequest, paymentValidationResponse);
    return this.apiResponseService.successResponse(
      ['Ipn request received please check the data property'],
      data ,
      res,
    );
  }

  @Post('/status')
  async statusPayment(
    @Body() paymentRequest: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    // @ts-ignore
    paymentRequest?.payment_type = 'sslcommerz';
    // @ts-ignore
    paymentRequest?.store_passwd = PaymentController.getStoreInfo(paymentRequest.store_id);
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.paymentStatus(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Payment Status retrieved successfully'],
      data,
      res,
    );
  }

  @Post('/refund-initiate')
  async refundpayiatePayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.refund(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }

  @Post('/refund-query')
  async refundQueryPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.refundQuery(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }

  getPaymentService(payment_type: any) {
    switch (payment_type) {
      case 'sslcommerz':
        return  this.sslcommerzPaymentService;
      default:
        return this.sslcommerzPaymentService;
    }
  }

   getStoreInfo(store_id: string) {
    switch (store_id) {
      case 'testbox':
        return 'qwerty';
    }
    return 'testbox';
  }
}
