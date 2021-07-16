import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Response } from 'express';
import {
  PaymentRequest, PaymentStatusRequest,
  PaymentType,
  SSLCommerzRefundInitiateRequest, RefundQueryRequest,
  SSLCommerzSuccessFailCancelIPNResponse,
} from '../requests/payment.request';
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
        [data.message || 'Payment initiate failed'],
        res,
      );
    }
    // return null;

  }

  @Post('/success')
  async successPayment(
    @Body() paymentSuccessRequest: any,
    @Res() res: Response,
  ): Promise<any> {
    const context = this.paymentResolver.resolve(PaymentType.SSLCOMMERZ);
    const data = await context.success(paymentSuccessRequest);
    return res.redirect(data.data);
  }

  @Post('/cancel')
  async cancelPayment(
    @Body() paymentSuccessRequest: any,
    @Res() res: Response,
  ): Promise<any> {
    const context = this.paymentResolver.resolve(PaymentType.SSLCOMMERZ);
    const data = await context.success(paymentSuccessRequest);
    return res.redirect(data.data);
  }

  @Post('/fail')
  async failPayment(
    @Body() paymentSuccessRequest: any,
    @Res() res: Response,
  ): Promise<any> {
    const context = this.paymentResolver.resolve(PaymentType.SSLCOMMERZ);
    const data = await context.success(paymentSuccessRequest);
    return res.redirect(data.data);
  }

  @Post('/ipn')
  async ipnPayment(
    @Body() ipnResponse: SSLCommerzSuccessFailCancelIPNResponse,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const context = this.paymentResolver.resolve(PaymentType.SSLCOMMERZ);
    const data = await context.ipnCheck(ipnResponse);
    if (data.code == HttpStatus.OK) {
      return this.apiResponseService.successResponse(
        [data.message || 'Payment initiate successfully'],
        data.data,
        res,
      );
    } else {
      return this.apiResponseService.badRequestError(
        [data.message || 'Payment initiate failed'],
        res,
      );
    }
  }

  @Post('/refund-initiate')
  async refundpayiatePayment(
    @Body() refundInitiateRequest: SSLCommerzRefundInitiateRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const context = this.paymentResolver.resolve(refundInitiateRequest.payment_type);
    const data = await context.refund(refundInitiateRequest);
    if (data.code == HttpStatus.OK) {
      return this.apiResponseService.successResponse(
        [data.message || 'Payment refund initiate successfully'],
        data.data,
        res,
      );
    } else {
      return this.apiResponseService.badRequestError(
        [data.message || 'Payment initiate failed'],
        res,
      );
    }
  }
  @Post('/refund-query')
  async refundQueryPayment(
    @Body() refundInitiateRequest: RefundQueryRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const context = this.paymentResolver.resolve(refundInitiateRequest.payment_type);
    const data = await context.refund(refundInitiateRequest);
    if (data.code == HttpStatus.OK) {
      return this.apiResponseService.successResponse(
        [data.message || 'Payment refund query successfully'],
        data.data,
        res,
      );
    } else {
      return this.apiResponseService.badRequestError(
        [data.message || 'Payment query failed'],
        res,
      );
    }
  }


    @Post('/status')
    async statusPayment(
      @Body() paymentStatusRequest: PaymentStatusRequest,
      @Res() res: Response,
    ): Promise<Response<ResponseModel>> {
      // @ts-ignore
      const context = this.paymentResolver.resolve(refundInitiateRequest.payment_type);
      const data = await context.paymentStatus(paymentStatusRequest);
      if (data.code == HttpStatus.OK) {
        return this.apiResponseService.successResponse(
          [data.message || 'Payment refund query successfully'],
          data.data,
          res,
        );
      } else {
        return this.apiResponseService.badRequestError(
          [data.message || 'Payment query failed'],
          res,
        );
      }
    }

}
