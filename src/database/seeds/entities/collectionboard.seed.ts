import * as faker from "faker";

import Carrier from "../../entities/carrier.entity";
import CarrierSeed from "./carrier.seed";
import CollectionBoard from "../../entities/collectionboard.entity";
import { getManager } from "typeorm";

interface CollectionBoardSeedProps {
  displayId?: string;
  carrierBalance?: number;
  date?: Date;
  carrier?: Carrier;
}

export default class CollectionBoardSeed {
  async default(): Promise<void> {
    const carrier = (await new CarrierSeed().with({}))[0];
    const cb = this.getFakeCollectionBoard(carrier);
    await getManager().save(cb);
  }

  async with(
    props: CollectionBoardSeedProps,
    count = 1
  ): Promise<CollectionBoard[]> {
    const boards = [];
    for (let index = 0; index < count; index++) {
      const { carrier: ca } = props;
      const carrier = ca ? ca : (await new CarrierSeed().with({}))[0];
      const cb = this.getFakeCollectionBoard(carrier);
      boards.push(cb);
    }

    return await getManager().save(boards);
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
