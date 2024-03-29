import { IsNotEmpty } from 'class-validator';

export class PaymentRequest {
  @IsNotEmpty({ message: 'Payment gateway type invalid or missing' })
  payment_type: string;

  @IsNotEmpty({ message: 'Payment gateway store id missing or invalid' })
  store_id: string;

  store_passwd: string;
  total_amount: number;

  currency?: string;
  tran_id: string;
  product_category?: string;
  success_url?: string;
  fail_url?: string;
  cancel_url?: string;
  ipn_url?: string;
  multi_card_name?: string;
  allowed_bin?: string;
  emi_option?: number;
  emi_max_inst_option?: number;
  emi_selected_inst?: number;
  emi_allow_only?: number;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_add2?: string;
  cus_city: string;
  cus_state?: string;
  cus_postcode: string;
  cus_country: string;
  cus_phone: string;
  cus_fax?: string;
  shipping_method: string;
  num_of_item: number;
  ship_name?: string;
  ship_add1?: string;
  ship_add2?: string;
  ship_city?: string;
  ship_state?: string;
  ship_postcode?: string;
  ship_country?: string;
  product_name?: string;
  product_profile?: string;
  cart?: string;
  product_amount?: number;
  vat?: number;
  discount_amount?: number;
  convenience_fee?: number;
  is_live?: boolean;
}
