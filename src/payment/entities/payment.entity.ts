import BaseEntity from 'src/utils/entities/base-entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 63 })
  store_id: string;

  @Column({ type: 'varchar', length: 31 })
  tran_id: string;

  @Column({ type: 'varchar', length: 63 })
  val_id: string;

  @Column({ type: 'varchar', length: 63 })
  session_key: string;

  @Column({ type: 'double', precision: 2, length: 10 })
  amount: number;

  @Column({ type: 'double', length: 10, precision: 2, default: 0.0 })
  store_amount: number;

  @Column({ type: 'varchar', default: 'BDT' })
  currency: string;

  @Column({ type: 'varchar', length: 23, default: 'INITIATED', nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 23, default: 'processing' })
  service_status: string;//todo need to make this field enum

  @Column({ type: 'varchar', length: 255, nullable: true })
  payment_init_failed_reason: string;

  @Column({ type: 'datetime', length: 23, nullable: true })
  tran_date: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  card_type: string;

  @Column({ type: 'varchar', length: 127, nullable: true })
  card_no: string;

  @Column({ type: 'varchar', length: 127, nullable: true })
  bank_tran_id: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  card_issuer: string;

  @Column({ type: 'varchar', length: 31, nullable: true })
  card_brand: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  card_issuer_country: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  card_issuer_country_code: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  currency_type: string;

  @Column({ type: 'double', precision: 2, default: 0.0 })
  currency_amount: number;

  @Column({ type: 'text', nullable: true })
  verify_sign: string;

  @Column({ type: 'text', nullable: true })
  verify_key: string;

  @Column({ type: 'boolean', default: false })
  risk_level: boolean;

  @Column({ type: 'varchar', nullable: true })
  risk_title: boolean;

  @Column({ type: 'integer', length: 2, nullable: true })
  emi_instalment: number;

  @Column({ type: 'double', length: 10, precision: 2, default: 0.0 })
  emi_amount: number;

  @Column({ type: 'double', length: 10, precision: 2, default: 0.0 })
  discount_amount: number;

  @Column({ type: 'double', length: 10, precision: 2, default: 0.0 })
  discount_percentage: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  discount_remarks: string;

  @Column({ type: 'boolean', default: false })
  is_refunded: boolean;

  @Column({ type: 'double', length: 10, precision: 2, default: 0.0 })
  refund_amount: number;

  @Column({ type: 'varchar', length: 63, nullable: true })
  refund_ref_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refund_error_reason: string;

  @Column({ type: 'datetime', nullable: true })
  refund_initiated_on: string;

  @Column({ type: 'datetime', nullable: true })
  refunded_on: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  service_retry_count: string;
}
