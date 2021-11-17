import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import PaymentHold from "./paymenthold.entity";

@Entity()
export default class PaymentHoldType {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PaymentHold, (ph) => ph.paymentHoldType)
  paymentHolds: PaymentHold[];
}

export enum ValidHoldTypes {
  EP = "EP",
  Load = "Load",
  PWP = "PWP",
  Carrier = "Carrier"
}
