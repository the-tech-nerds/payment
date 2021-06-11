import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { PaymentController } from './controller/payment.controller';
import { Payment } from './entities/payment.entity';
import { InitPaymentService } from './service/init-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [ApiResponseService, InitPaymentService],
  controllers: [PaymentController],
  exports: [],
})
export class PaymentModule {}
