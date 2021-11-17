import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import Carrier from "./carrier.entity";
import Load from "./load.entity";
import PaymentMethod from "./paymentmethod.entity";

@Entity()
export default class FactoringCompany {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  paymentTerms: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.carriers)
  paymentMethod: PaymentMethod;

  @OneToMany(() => Load, (load) => load.factoringCompany)
  loads: Load[];

  @OneToMany(() => Carrier, (carrier) => carrier.factoringCompany)
  carriers: Carrier[];
}
