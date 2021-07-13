import { IsNotEmpty, IsNumber } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

enum PaymentType {
  SSLCOMMERZ = 'sslcommerz',
  BKASH = 'bkash'
}

export class Customer {
  @IsNotEmpty({ message: 'Customer name is missing or invalid' })
  cus_name: string;
  @IsNotEmpty({ message: 'Customer email is missing or invalid' })
  cus_email: string;
  @IsNotEmpty({ message: 'Customer address is missing or invalid' })
  cus_add1: string;
  cus_add2?: string;
  @IsNotEmpty({ message: 'Customer city is missing or invalid' })
  cus_city: string;
  cus_state?: string;
  @IsNotEmpty({ message: 'Customer postcode is missing or invalid' })
  cus_postcode: string;
  @IsNotEmpty({ message: 'Customer country is missing or invalid' })
  cus_country: string;
  @IsNotEmpty({ message: 'Customer phone is missing or invalid' })
  cus_phone: string;
  cus_fax?: string;
}

export class Shipping {
  @IsNotEmpty({ message: 'Shipping method is missing or invalid' })
  shipping_method: string = 'No';
  num_of_item: number;
  ship_name?: string;
  ship_add1?: string;
  ship_add2?: string;
  ship_city?: string;
  ship_state?: string;
  ship_postcode?: string;
  ship_country?: string;
}

export class Product {
  @IsNotEmpty({ message: 'Product name is missing or invalid' })
  product_name?: string;
  @IsNotEmpty({ message: 'Product category is missing or invalid' })
  product_category: string;
  @IsNotEmpty({ message: 'Product profile is missing or invalid' })
  product_profile?: string;
}

export class AdditionalParameters {
  cart?: JSON;
  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
}

export class PaymentRequest {
  customer: Customer;
  shipping: Shipping;
  product_info: Product;
  payment_type: PaymentType;
  additional_parameters: AdditionalParameters;
  @IsNotEmpty({ message: 'Customer city is missing or invalid' })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  }, { message: 'Total amount should be number and max decimal places ' })
  total_amount: number;
  @IsNotEmpty({ message: 'Customer city is missing or invalid' })
  transaction_id: string;
  currency: string = 'BDT';
}

export class SSLCommerzResponse {
}

export class Response<T> {
  code: HttpStatus;
  message: string;
  data: T;
}
