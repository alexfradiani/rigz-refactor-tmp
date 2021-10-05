import { CLIMethod } from "../cli";
import { db } from "../../services/common";
import * as faker from "faker";
import {
  financialTransactionCollection
} from "../../models/financialtransaction";
import LoadSeed from "./load.seed";

export default class FinancialTransactionSeed implements CLIMethod {
  async one(): Promise<string> {
    try {
      const loadId = await new LoadSeed().one();
      const result = await db.collection(financialTransactionCollection).add({
        carrierAmount: faker.datatype.float(),
        carrierCBAmount: faker.datatype.float(),
        carrierPending: faker.datatype.number(),
        customerAmount: faker.datatype.float(),
        date: faker.datatype.datetime(),
        loadId: loadId,
        loadProfitAmount: faker.datatype.float(),
        type: "shortpay"
      });

      return result.id;
    } catch (error) {
      console.log(error, "FactoringCompany insert One fails");
      throw error;
    }
  }

  async many(max?: number): Promise<string[]> {
    try {
      const result: string[] = [];
      const maxFinancialTransactions = !max ? faker.datatype.number(30) : max;
      const batch = db.batch();
      const loadsCreated = await new LoadSeed().many(max);

      loadsCreated.map((loadId) => {
        for (let index = 0; index < maxFinancialTransactions; index++) {
          const newFinancialTransactionCoRef = db
            .collection(financialTransactionCollection)
            .doc();

          batch.set(newFinancialTransactionCoRef, {
            carrierAmount: faker.datatype.float(),
            carrierCBAmount: faker.datatype.float(),
            carrierPending: faker.datatype.number(),
            customerAmount: faker.datatype.float(),
            date: faker.datatype.datetime(),
            loadId: loadId,
            loadProfitAmount: faker.datatype.float(),
            type: "shortpay"
          });

          result.push(newFinancialTransactionCoRef.id);
        }
      });

      await batch.commit();
      return result;
    } catch (error) {
      console.log(error, "FactoringCompany insert many fails");
      throw error;
    }
  }

  async manyWithLoadIds(max: number, loadIds: string[]): Promise<string[]> {
    try {
      const result: string[] = [];
      const maxFinancialTransactions = !max ? loadIds.length : max;
      const batch = db.batch();

      loadIds.map((loadId) => {
        for (let index = 0; index < maxFinancialTransactions; index++) {
          const newFinancialTransactionCoRef = db
            .collection(financialTransactionCollection)
            .doc();

          batch.set(newFinancialTransactionCoRef, {
            carrierAmount: faker.datatype.float(),
            carrierCBAmount: faker.datatype.float(),
            carrierPending: faker.datatype.number(),
            customerAmount: faker.datatype.float(),
            date: faker.datatype.datetime(),
            loadId: loadId,
            loadProfitAmount: faker.datatype.float(),
            type: "shortpay"
          });

          result.push(newFinancialTransactionCoRef.id);
        }
      });

      await batch.commit();
      return result;
    } catch (error) {
      console.log(error, "FactoringCompany insert many fails");
      throw error;
    }
  }
}
