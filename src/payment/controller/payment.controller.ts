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
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }

  @Post('/cancel')
  async cancelPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.cancel(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }

  @Post('/fail')
  async failPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.fail(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }

  @Post('/success')
  async successPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.success(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }

  @Post('/ipn')
  async ipnPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.ipnCheck(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }

  @Post('/status')
  async statusPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    this.context = new PaymentActionContext(this.getPaymentService(paymentRequest?.payment_type));
    const data = await this.context.paymentStatus(paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
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

  private getPaymentService(payment_type: any) {
    switch (payment_type) {
      case 'sslcommerz':
        return this.sslcommerzPaymentService;
      default:
        return this.sslcommerzPaymentService;
    }
  }
}
