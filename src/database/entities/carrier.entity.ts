import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import CollectionBoard from "./collectionboard.entity";
import FactoringCompany from "./factoringcompany.entity";
import Load from "./load.entity";
import PaymentMethod from "./paymentmethod.entity";

@Entity()
export default class Carrier {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  displayId: string;

  @Column()
  name: string;

  @Column()
  paymentTerms: string;

  @OneToMany(() => Load, (load) => load.carrier)
  loads: Load[];

  @ManyToOne(() => FactoringCompany, (fc) => fc.carriers)
  factoringCompany: FactoringCompany;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.carriers)
  paymentMethod: PaymentMethod;

  @OneToMany(() => CollectionBoard, (cb) => cb.carrier)
  collectionBoards: CollectionBoard[];
}
