import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import Load from "./load.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @OneToOne(() => Load)
  @JoinColumn()
  processingLoad: Load;
}
