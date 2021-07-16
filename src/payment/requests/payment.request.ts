import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { Type } from 'class-transformer';

export enum PaymentType {
  SSLCOMMERZ = 'sslcommerz',
  BKASH = 'bkash',
}

export class Customer {
  @IsNotEmpty({ message: 'Customer name is missing or invalid' })
  cus_name: string;
  @IsNotEmpty({ message: 'Customer email is missing or invalid' })
  cus_email: string;
  @IsNotEmpty({ message: 'Customer address is missing or invalid ' })
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
  @ValidateNested({ each: true })
  @Type(() => Customer)
  customer: Customer;

  @ValidateNested({ each: true })
  @Type(() => Shipping)
  shipping: Shipping;

  @ValidateNested({ each: true })
  @Type(() => Product)
  product_info: Product;

  @IsEnum(PaymentType, { message: 'Payment type is missing or invalid' })
  payment_type: PaymentType;

  @ValidateNested({ each: true })
  @Type(() => AdditionalParameters)
  additional_parameters: AdditionalParameters;
  @IsNotEmpty({ message: 'Total amount is missing or invalid' })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2,
    },
    { message: 'Total amount should be number and max decimal places ' },
  )
  total_amount: number;
  @IsNotEmpty({ message: 'Transaction id. is missing or invalid' })
  tran_id: string;
  currency: string = 'BDT';
}

export interface GW {
  amex: string,
  internetbanking: string,
  master: string,
  mobilebanking: string,
  othercards: string,
  visa: string,
}

export interface DESC {
  gw: string,
  logo: string,
  name: string,
  r_flag: string,
  redirectGatewayURL: string,
  type: string,
}

export interface SSLCommerzInitiateResponse {

  GatewayPageURL: string,
  desc: DESC[],
  directPaymentURL: string
  directPaymentURLBank: string,
  directPaymentURLCard: string,
  failedreason: string,
  gw: GW
  is_direct_pay_enable: string,
  redirectGatewayURL: string
  redirectGatewayURLFailed: string,
  sessionkey: string,
  status: string,
  storeBanner: string,
  storeLogo: string,
  store_name: string,
}

export interface SSLCommerzSuccessFailCancelIPNResponse {
  tran_id: string;
  val_id: string;
  amount: number;
  card_type: string;
  store_amount: number;
  card_no: string;
  bank_tran_id: string;
  status: string;
  error: string;
  tran_date: string;
  currency: string;
  card_issuer: string;
  card_brand: string;
  card_sub_brand: string;
  card_issuer_country: string;
  card_issuer_country_code: string;
  store_id: string;
  currency_type: string;
  currency_amount: number;
  currency_rate: string;
  base_fair: string;
  value_a: string;
  value_b: string;
  value_c: string;
  value_d: string;
  risk_level: number;
  risk_title: string;
  verify_sign: string;
  verify_sign_sha2: string;
  verify_key: string;
  type: string;
  cus_fax: string;
  discount_amount: number;
  discount_percentage: number;
  discount_remarks: string;
  emi_instalment: number,
  emi_amount: number,
  emi_description: string,
  emi_issuer: string,
  account_details: string,
  APIConnect: string,
  validated_on: string,
  gw_version: string
}

export class PaymentResponse<T> {
  code: HttpStatus;
  message: string;
  data: T;
}

export interface RefundResponse {
  APIConnect: string;
  bank_tran_id: string;
  trans_id: string;
  refund_ref_id: string;
  status: string;
  errorReason: string;
}

export interface SSLCommerzRefundQueryResponse {
  APIConnect: string;
  bank_tran_id: string;
  trans_id: string;
  refund_ref_id: string;
  status: string;
  initiated_on: string,
  refunded_on: string,
  errorReason: string
}

export interface SSLCommerzRefunIntiateResponse {
  APIConnect: string;
  bank_tran_id: string;
  trans_id: string;
  refund_ref_id: string;
  status: string;
  errorReason: string;
}

export class SSLCommerzRefundInitiateRequest {
  payment_type: PaymentType;
  tran_id: string;

}

export class RefundQueryRequest {
  payment_type: PaymentType;
  tran_id: string;

}export class PaymentStatusRequest {
  payment_type: PaymentType;
  tran_id: string;

}
