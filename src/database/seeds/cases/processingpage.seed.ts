import CarrierSeed from "../entities/carrier.seed";
import CollectionBoardSeed from "../entities/collectionboard.seed";
import { Connection } from "typeorm";
import FinancialTransactionSeed from "../entities/financialtransaction.seed";
import Load from "../../entities/load.entity";
import LoadSeed from "../entities/load.seed";
import UserSeed from "../entities/user.seed";

export default class ProcessingPageSeed {
  db: Connection;
  carriersCount = 20;
  loadsCount = 5;
  ftCount = 5;

  constructor(db: Connection) {
    this.db = db;
  }

  async one(): Promise<void> {
    const carrierSeed = new CarrierSeed(this.db);
    const carriers = await carrierSeed.many(this.carriersCount);
    console.log("carriers created");

    const userSeed = new UserSeed(this.db);
    const users = await userSeed.many(this.carriersCount);
    console.log("users created");

    const loadSeed = new LoadSeed(this.db);
    let loads: Load[] = [];
    for (let i = 0; i < this.carriersCount; i++) {
      const newLoads = await loadSeed.withCarrier(carriers[i], this.loadsCount);
      users[i].processingLoad = newLoads[0]; // carrier-processing user
      await this.db.manager.save(users[i]);

      loads = loads.concat(newLoads);
    }
    console.log("loads created");

    const ftSeed = new FinancialTransactionSeed(this.db);
    for (let i = 0; i < loads.length; i++) {
      await ftSeed.withLoad(loads[i], this.ftCount);
    }
    console.log("financial transactions created");

    const cbSeed = new CollectionBoardSeed(this.db);
    for (let i = 0; i < this.carriersCount; i++) {
      await cbSeed.withCarrier(carriers[i]);
    }
    console.log("collection boards created");
  }

  async many(): Promise<void> {}
}
