import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import Load from "./load.entity";
import PaymentHoldType from "./paymentholdtype.entity";

@Entity()
export default class PaymentHold {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => Load)
  @JoinColumn()
  load: Load;

  @ManyToOne(
    () => PaymentHoldType,
    (paymentHoldType) => paymentHoldType.paymentHolds
  )
  paymentHoldType: PaymentHoldType;
}
