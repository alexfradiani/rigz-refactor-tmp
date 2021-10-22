import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class FactoringCompany {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
