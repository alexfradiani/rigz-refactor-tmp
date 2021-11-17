import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import Carrier from "./carrier.entity";
import FactoringCompany from "./factoringcompany.entity";
import FinancialTransaction from "./financialtransaction.entity";

@Entity()
export default class Load {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  carrierFee: number;

  @Column()
  isActive: boolean;

  @Column()
  dueDate: Date;

  @Column()
  doNotPayFactoring: boolean;

  @ManyToOne(() => Carrier, (carrier) => carrier.loads)
  carrier: Carrier;

  @OneToMany(() => FinancialTransaction, (ft) => ft.load)
  financialTransactions: FinancialTransaction[];

  @ManyToOne(() => FactoringCompany, (fc) => fc.loads)
  factoringCompany: FactoringCompany;
}
