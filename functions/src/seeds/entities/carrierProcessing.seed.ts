import * as faker from "faker";

import { batcher } from "../../services/common";
import { carrierProcessingCollection } from "../../models/carrierprocessing";

export default class CarrierProcessingSeed {
  async one(): Promise<void> {}

  async many(): Promise<void> {}

  async withCarrierAndUserId(
    carrierId: string,
    userId: string
  ): Promise<string> {
    const data = { carrierId, userId, lastUpdate: faker.datatype.datetime() };
    const result = await batcher.write(carrierProcessingCollection, [data]);

    return result[0];
  }
}
