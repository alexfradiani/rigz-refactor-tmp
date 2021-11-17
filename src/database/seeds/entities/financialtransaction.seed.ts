import * as faker from "faker";

import FinancialTransaction from "../../entities/financialtransaction.entity";
import Load from "../../entities/load.entity";
import LoadSeed from "./load.seed";
import { getManager } from "typeorm";

interface FTSeeedProps {
  carrierAmount?: number;
  carrierCBAmount?: number;
  carrierPending?: number;
  customerAmount?: number;
  date?: Date;
  loadProfitAmount?: number;
  load?: Load;
  type?: string;
}

export default class FinancialTransactionSeed {
  async default(): Promise<void> {}

  async with(props: FTSeeedProps, count = 1): Promise<FinancialTransaction[]> {
    const fts = [];
    for (let index = 0; index < count; index++) {
      const { load: lo } = props;
      const load = lo ? lo : (await new LoadSeed().with({}))[0];
      let ft = this.getFakeTransaction(load);
      ft = Object.assign(ft, props);
      fts.push(ft);
    }

    return await getManager().save(fts);
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
