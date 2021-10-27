import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import CollectionBoard from "./collectionboard.entity";
import FactoringCompany from "./factoringcompany.entity";
import Load from "./load.entity";

@Entity()
export default class Carrier {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  displayId: string;

  @Column()
  name: string;

  @Column()
  paymentTerms: string;

  @OneToMany(() => Load, (load) => load.carrier)
  loads: Load[];

  @OneToOne(() => FactoringCompany)
  @JoinColumn()
  factoringCompany: FactoringCompany;

  @OneToMany(() => CollectionBoard, (cb) => cb.carrier)
  collectionBoards: CollectionBoard[];
}
