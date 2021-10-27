import * as faker from "faker";

import { Connection } from "typeorm";
import FinancialTransaction from "../../entities/financialtransaction.entity";
import Load from "../../entities/load.entity";

export default class FinancialTransactionSeed {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async one(): Promise<void> {
    // TODO
  }

  async many(): Promise<void> {
    // TODO
  }

  async withLoad(load: Load, count = 10): Promise<FinancialTransaction[]> {
    const fts = [];
    for (let index = 0; index < count; index++) {
      fts.push(this.getFakeTransaction(load));
    }

    return await this.db.manager.save(fts);
  }

  getFakeTransaction(load: Load): FinancialTransaction {
    const ft = new FinancialTransaction();
    ft.carrierAmount = faker.datatype.float();
    ft.carrierCBAmount = faker.datatype.float();
    ft.carrierPending = faker.datatype.number();
    ft.customerAmount = faker.datatype.float();
    ft.date = faker.datatype.datetime();
    ft.loadProfitAmount = faker.datatype.float();
    ft.load = load;
    ft.type = `mocked-transaction-${faker.datatype.string()}`;

    return ft;
  }
}
