import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Carrier from "./carrier.entity";

@Entity()
export default class CollectionBoard {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  carrierBalance: number;

  @Column()
  date: Date;

  @Column()
  displayId: string;

  @ManyToOne(() => Carrier, (carrier) => carrier.collectionBoards)
  carrier: Carrier;
}
