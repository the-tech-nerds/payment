import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Response } from 'express';
import { PaymentRequest, PaymentType } from '../requests/payment.request';
import { PaymentResolver } from '../action/payment-resolver';

@Controller()
export class PaymentController {
  context: any;

  constructor(
    private paymentResolver: PaymentResolver,
    private readonly apiResponseService: ApiResponseService,
  ) {
  }

  @Post('/')
  async createPayment(
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const {
      payment_type: paymentType = null,
    } = paymentRequest;

    if (!paymentType) {
      throw new Error('Payment type is required');
    }
    const context = this.paymentResolver.resolve(paymentType);
    const data = await context.pay(paymentRequest);

    if (data.code == HttpStatus.OK) {
      return this.apiResponseService.successResponse(
        [data.message || 'Payment initiate successfully'],
        data.data,
        res,
      );
    } else {
      return this.apiResponseService.badRequestError(
        [data.message || 'Payment initiate successfully'],
        res,
      );
    }
    // return null;

  }
  @Post('/success')
  async successPayment(
    @Body() paymentSuccessRequest: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const context = this.paymentResolver.resolve(PaymentType.SSLCOMMERZ);
    const data = await context.success(paymentSuccessRequest);
    return this.apiResponseService.successResponse(
      ['Payment process successfully done'],
      data,
      res,
    );
  }

  /*
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


    @Post('/ipn')
    async ipnPayment(
      @Body() paymentIpnRequest: any,
      @Res() res: Response,
    ): Promise<Response<ResponseModel>> {
      // @ts-ignore
      paymentIpnRequest?.payment_type = 'sslcommerz';
      // @ts-ignore
      paymentIpnRequest?.store_passwd = PaymentController.getStoreInfo(paymentIpnRequest.store_id);
      this.context = new PaymentActionContext(paymentIpnRequest?.payment_type);
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

    getStoreInfo(store_id: string) {
      switch (store_id) {
        case 'testbox':
          return 'qwerty';
      }
      return 'testbox';
    }*/
}
