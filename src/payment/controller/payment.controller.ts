import { Body, Controller, Get, Res } from '@nestjs/common';
import {
  ApiResponseService,
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

  @Get('/')
  async createPayment(
    // @CurrentUser('id') userId: any,
    @Body() paymentRequest: PaymentRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.initPaymentService.create(1, paymentRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Payment,
      res,
    );
  }
}
