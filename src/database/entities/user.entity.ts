import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import Carrier from "./carrier.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @OneToOne(() => Carrier)
  @JoinColumn()
  processingCarrier: Carrier;
}
