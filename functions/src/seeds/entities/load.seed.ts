import { CLIMethod } from "../cli";
import { db } from "../../services/common";
import * as faker from "faker";
import { loadCollection } from "../../models/load";
import CarrierSeed from "./carrier.seed";
import FinancialTransactionSeed from "./financialTransaction.seed";

export default class LoadSeed implements CLIMethod {
  private async createCarrier(): Promise<string> {
    const carrierSeed = new CarrierSeed();
    return await carrierSeed.one();
  }

  private async createCarriersWithBatch(
    carriersAmount: number,
    writeBatch: FirebaseFirestore.WriteBatch
  ): Promise<string[]> {
    const carrierSeed = new CarrierSeed();
    return await carrierSeed.manyWithBatch(carriersAmount, writeBatch);
  }

  async one(): Promise<string> {
    try {
      const carrierId = this.createCarrier();
      const result = await db.collection(loadCollection).add({
        carrierFee: faker.datatype.number(),
        carrierId: carrierId,
        isActive: true,
        dueDate: faker.datatype.datetime()
      });
      return result.id;
    } catch (error) {
      console.log(error, "LoadSeed insert one fails");
      throw error;
    }
  }

  async many(max?: number): Promise<string[]> {
    try {
      const loadIdsCreated: string[] = [];
      const maxAmount = !max ? 10 : max;
      const batch = db.batch();
      const carriersCreated = await this.createCarriersWithBatch(5, batch);

      carriersCreated.map((carrierId) => {
        for (let index = 0; index < maxAmount; index++) {
          const newCarrierRef = db.collection(loadCollection).doc();
          batch.set(newCarrierRef, {
            carrierFee: faker.datatype.number(),
            carrierId: carrierId,
            isActive: true,
            dueDate: faker.datatype.datetime()
          });
          loadIdsCreated.push(newCarrierRef.id);
        }
      });
      await batch.commit();

      await new FinancialTransactionSeed().manyWithLoadIds(
        maxAmount,
        loadIdsCreated
      );

      return loadIdsCreated;
    } catch (error) {
      console.log(error, "LoadSeed insert many fails");
      throw error;
    }
  }
}
