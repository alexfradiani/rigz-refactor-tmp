import * as faker from "faker";

import { Connection } from "typeorm";
import FactoringCompany from "../../entities/factoringcompany.entity";

export default class FactoringCompanySeed {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async one(): Promise<FactoringCompany> {
    const fc = new FactoringCompany();
    fc.name = faker.company.companyName();

    return await this.db.manager.save(fc);
  }

  async many(): Promise<void> {
    // TODO
  }
}
