import * as faker from "faker";

import { batcher } from "../../services/common";
// prettier-ignore
import { financialTransactionCollection } from
  "../../models/financialtransaction";

interface FCObj {
  carrierAmount: number;
  carrierCBAmount: number;
  carrierPending: number;
  customerAmount: number;
  date: Date;
  loadId: string;
  loadProfitAmount: number;
  type: string;
}
export default class FinancialTransactionSeed {
  async one(): Promise<void> {}

  async many(): Promise<void> {}

  async withLoadId(loadId: string, count = 10): Promise<string[]> {
    const ftsData = [];
    for (let index = 0; index < count; index++) {
      ftsData.push(this.getFakeTransaction(loadId));
    }

    return await batcher.write(financialTransactionCollection, ftsData);
  }

  getFakeTransaction(loadId: string): FCObj {
    return {
      carrierAmount: faker.datatype.float(),
      carrierCBAmount: faker.datatype.float(),
      carrierPending: faker.datatype.number(),
      customerAmount: faker.datatype.float(),
      date: faker.datatype.datetime(),
      loadId,
      loadProfitAmount: faker.datatype.float(),
      type: "mocked-transaction"
    };
  }
}
