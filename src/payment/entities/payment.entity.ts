import BaseEntity from 'src/utils/entities/base-entity';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
store_id:string;
@Column()
store_passwd:string;
@Column()
total_amount:string;
@Column()
currency:string;
@Column()
tran_id:string;
@Column()
success_url:string;
@Column()
fail_url:string;
@Column()
cancel_url:string;
@Column()
cus_name:string;
@Column()
cus_email:string;
@Column()
cus_add1:string;
@Column()
cus_add2:string;
@Column()
cus_city:string;
@Column()
cus_state:string;
@Column()
cus_postcode:string;
@Column()
cus_country:string;
@Column()
cus_phone:string;
@Column()
cus_fax:string;
@Column()
ship_name:string;
@Column()
ship_add1 :string;
@Column()
ship_add2:string;
@Column()
ship_city:string;
@Column()
ship_state:string;
@Column()
ship_postcode:string;
@Column()
ship_country:string;
@Column()
multi_card_name:string;
@Column()
value_a:string;
@Column()
value_b:string;
@Column()
value_c:string;
@Column()
value_d:string;
}
