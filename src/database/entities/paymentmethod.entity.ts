import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import Carrier from "./carrier.entity";
import FactoringCompany from "./factoringcompany.entity";

@Entity()
export default class PaymentMethod {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Carrier, (carrier) => carrier.paymentMethod)
  carriers: Carrier[];

  @OneToMany(
    () => FactoringCompany,
    (factoringCompany) => factoringCompany.paymentMethod
  )
  factoringCompanies: FactoringCompany[];
}

export enum ValidMethods {
  Check = "Check",
  DirectDeposit = "DirectDeposit",
  FuelCard = "FuelCard"
}
