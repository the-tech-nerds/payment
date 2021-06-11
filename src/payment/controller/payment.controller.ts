import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiResponseService,
  CurrentUser,
} from '@the-tech-nerds/common-services';
import { Response } from 'express';
import { Payment } from '../entities/payment.entity';
import { PaymentRequest } from '../requets/payment.request';
import { InitPaymentService } from '../service/init-payment.service';

@Controller()
export class PaymentController {
  constructor(
    private readonly initPaymentService: InitPaymentService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('/')
  async createPayment(
    @CurrentUser('id') userId: any,
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.initPaymentService.create(userId, paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }
}
