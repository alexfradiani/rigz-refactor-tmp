import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import Carrier from "./carrier.entity";
import FinancialTransaction from "./financialtransaction.entity";

@Entity()
export default class Load {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  carrierFee: number;

  @Column()
  isActive: boolean;

  @Column()
  dueDate: Date;

  @ManyToOne(() => Carrier, (carrier) => carrier.loads)
  carrier: Carrier;

  @OneToMany(() => FinancialTransaction, (ft) => ft.load)
  financialTransactions: FinancialTransaction[];
}
