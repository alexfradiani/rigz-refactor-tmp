import * as faker from "faker";

import Carrier from "../../entities/carrier.entity";
import CollectionBoard from "../../entities/collectionboard.entity";
import { Connection } from "typeorm";

export default class CollectionBoardSeed {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async one(): Promise<void> {
    // TODO
  }

  async many(): Promise<void> {
    // TODO
  }

  async withCarrier(carrier: Carrier, count = 10): Promise<CollectionBoard[]> {
    const boards = [];
    for (let index = 0; index < count; index++) {
      boards.push(this.getFakeCollectionBoard(carrier));
    }

    return await this.db.manager.save(boards);
  }

  getFakeCollectionBoard(carrier: Carrier): CollectionBoard {
    const cb = new CollectionBoard();
    cb.displayId = `${faker.datatype.number()}`;
    cb.carrierBalance = faker.datatype.number();
    cb.date = faker.datatype.datetime();
    cb.carrier = carrier;

    return cb;
  }
}
