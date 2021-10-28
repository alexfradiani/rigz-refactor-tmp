import * as faker from "faker";

import Carrier from "../../entities/carrier.entity";
import { Connection } from "typeorm";
import FactoringCompany from "../../entities/factoringcompany.entity";
import FactoringCompanySeed from "./factoringcompany.seed";

export default class CarrierSeed {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async one(): Promise<Carrier> {
    const fc = await this.createFC();
    const carrier = this.getFakeCarrier(fc);

    return this.db.manager.save(carrier);
  }

  async many(count = 10): Promise<Carrier[]> {
    const carriers = [];
    for (let index = 0; index < count; index++) {
      const fc = await this.createFC();
      carriers.push(this.getFakeCarrier(fc));
    }

    return this.db.manager.save(carriers);
  }

  private async createFC(): Promise<FactoringCompany> {
    const fcSeed = new FactoringCompanySeed(this.db);
    return fcSeed.one();
  }

  getFakeCarrier(fc: FactoringCompany): Carrier {
    const carrier = new Carrier();
    carrier.name = faker.company.companyName();
    carrier.displayId = faker.datatype.string();
    carrier.factoringCompany = fc;
    carrier.paymentTerms = faker.datatype.string();

    return carrier;
  }
}
