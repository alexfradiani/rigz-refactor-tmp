import * as faker from "faker";

import { batcher } from "../../services/common";
import { collectionBoardCollection } from "../../models/collectionboard";

interface CBObj {
  carrierId: string;
  carrierBalance: number;
  date: Date;
  displayId: string;
}

export default class CollectionBoardSeed {
  async one(): Promise<void> {
    // TODO
  }

  async many(): Promise<void> {
    // TODO
  }

  async withCarrierId(carrierId: string, count = 10): Promise<string[]> {
    const cbData = [];
    for (let index = 0; index < count; index++) {
      cbData.push(this.getFakeCollectionBoard(carrierId));
    }

    return await batcher.write(collectionBoardCollection, cbData);
  }

  getFakeCollectionBoard(carrierId: string): CBObj {
    return {
      carrierId,
      carrierBalance: faker.datatype.number(),
      date: faker.datatype.datetime(),
      displayId: `${faker.datatype.number()}`
    };
  }
}
