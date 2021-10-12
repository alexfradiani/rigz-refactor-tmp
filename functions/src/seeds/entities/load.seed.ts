import * as faker from "faker";

import CarrierSeed from "./carrier.seed";
import { batcher } from "../../services/common";
// import FinancialTransactionSeed from "./financialTransaction.seed";
import { loadCollection } from "../../models/load";

interface LoadObj {
  carrierFee: number;
  carrierId: string;
  isActive: boolean;
  dueDate: Date;
}
export default class LoadSeed {
  async one(): Promise<void> {}

  async many(count = 10): Promise<string[]> {
    const loadsData = [];
    for (let i = 0; i < count; i++) {
      const carrierId = await new CarrierSeed().one();
      loadsData.push(this.getFakeLoad(carrierId));
    }

    return await batcher.write(loadCollection, loadsData);
  }

  async withCarrier(carrierId: string, count = 10): Promise<string[]> {
    const loadsData = [];
    for (let i = 0; i < count; i++) {
      loadsData.push(this.getFakeLoad(carrierId));
    }

    return await batcher.write(loadCollection, loadsData);
  }

  getFakeLoad(carrierId: string): LoadObj {
    return {
      carrierFee: faker.datatype.number(),
      carrierId,
      isActive: true,
      dueDate: faker.datatype.datetime()
    };
  }
}
