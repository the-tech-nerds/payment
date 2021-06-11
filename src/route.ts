import { Routes } from 'nest-router';
import { PaymentModule } from './payment/payment.module';

export const routes: Routes = [
  {
    path: '/payment',
    module: PaymentModule,
  },
];
