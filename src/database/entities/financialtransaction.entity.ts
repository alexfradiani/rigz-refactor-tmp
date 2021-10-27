import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Load from "./load.entity";

@Entity()
export default class FinancialTransaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  carrierAmount: number;

  @Column()
  carrierCBAmount: number;

  @Column()
  carrierPending: number;

  @Column()
  customerAmount: number;

  @Column()
  loadProfitAmount: number;

  @Column()
  type: string;

  @Column()
  date: Date;

  @ManyToOne(() => Load, (load) => load.financialTransactions)
  load: Load;
}
