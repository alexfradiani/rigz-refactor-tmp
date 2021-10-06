import { db } from "../../services/common";
import * as faker from "faker";
import { loadCollection } from "../../models/load";
import CarrierSeed from "./carrier.seed";
import FinancialTransactionSeed from "./financialTransaction.seed";

export default class LoadSeed {
  async manyToProcessingPage(
    amountOfLoads: number,
    amountOfCarriers: number
  ): Promise<string[]> {
    try {
      const loadIdsCreated: string[] = [];
      const maxAmountOfLoads = !amountOfLoads ? 20 : amountOfLoads;
      const maxAmountOfCarriers = !amountOfCarriers ? 1200 : amountOfCarriers;

      // Seeding Carriers, FactoringCompany, CarrierProcessing, CollectionBoard
      const carriersCreated = await new CarrierSeed().manyToProcessingPage(
        maxAmountOfCarriers
      );

      // Seeding Loads and FinancialTransactions
      carriersCreated.map(async (carrierId) => {
        for (let index = 0; index < maxAmountOfLoads; index++) {
          const loadCreated = await db.collection(loadCollection).add({
            carrierFee: faker.datatype.number(),
            carrierId: carrierId,
            isActive: true,
            dueDate: faker.datatype.datetime()
          });
          loadIdsCreated.push(loadCreated.id);
        }
      });

      await new FinancialTransactionSeed().manyWithLoadIds(
        maxAmountOfLoads,
        loadIdsCreated
      );

      return loadIdsCreated;
    } catch (error) {
      console.log(error, "LoadSeed insert many fails");
      throw error;
    }
  }
}
