import { CLIMethod } from "../cli";
import CarrierProcessingSeed from "../entities/carrierProcessing.seed";
import CarrierSeed from "../entities/carrier.seed";
import CollectionBoardSeed from "../entities/collectionBoard.seed";
import FinancialTransactionSeed from "../entities/financialTransaction.seed";
import LoadSeed from "../entities/load.seed";
import UserSeed from "../entities/user.seed";

export default class ProcessingPageSeed implements CLIMethod {
  async one(): Promise<string> {
    try {
      const carriersCount = 50;
      const loadsCount = 15;
      const ftCount = 8;

      const carrierSeed = new CarrierSeed();
      const carrierIds = await carrierSeed.many(carriersCount);
      console.log("carriers created");

      const loadSeed = new LoadSeed();
      let loadIds: string[] = [];
      for (let i = 0; i < carriersCount; i++) {
        const newLoads = await loadSeed.withCarrier(carrierIds[i], loadsCount);
        loadIds = loadIds.concat(newLoads);
      }
      console.log("loads created");

      const ftSeed = new FinancialTransactionSeed();
      for (let i = 0; i < loadIds.length; i++) {
        await ftSeed.withLoadId(loadIds[i], ftCount);
      }
      console.log("financial transactions created");

      const userSeed = new UserSeed();
      const userIds = await userSeed.many(carriersCount);
      console.log("users created");

      const cpSeed = new CarrierProcessingSeed();
      const cbSeed = new CollectionBoardSeed();
      for (let i = 0; i < carriersCount; i++) {
        await cpSeed.withCarrierAndUserId(carrierIds[i], userIds[i]);
        await cbSeed.withCarrierId(carrierIds[i]);
      }
      console.log("collection boards created");
      console.log("carrier processing created");

      return "seed completed!";
    } catch (error) {
      console.log(error, "ProcessingPage insert one failed");
      throw error;
    }
  }

  async many(): Promise<void> {}
}
