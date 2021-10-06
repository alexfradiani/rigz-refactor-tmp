import { db } from "../../services/common";
import * as faker from "faker";
import {
  financialTransactionCollection
} from "../../models/financialtransaction";

export default class FinancialTransactionSeed {
  async manyWithLoadIds(max: number, loadIds: string[]): Promise<string[]> {
    try {
      const result: string[] = [];
      const maxFinancialTransactions = !max ? loadIds.length : max;

      loadIds.map(async (loadId) => {
        for (let index = 0; index < maxFinancialTransactions; index++) {
          const financitalTransactionCreated = await db
            .collection(financialTransactionCollection)
            .add({
              carrierAmount: faker.datatype.float(),
              carrierCBAmount: faker.datatype.float(),
              carrierPending: faker.datatype.number(),
              customerAmount: faker.datatype.float(),
              date: faker.datatype.datetime(),
              loadId: loadId,
              loadProfitAmount: faker.datatype.float(),
              type: "shortpay"
            });

          result.push(financitalTransactionCreated.id);
        }
      });

      return result;
    } catch (error) {
      console.log(error, "FinancialTransactions insert many fails");
      throw error;
    }
  }
}
