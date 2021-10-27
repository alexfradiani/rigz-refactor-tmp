import * as faker from "faker";

import Carrier from "../../entities/carrier.entity";
import CarrierSeed from "./carrier.seed";
import { Connection } from "typeorm";
import Load from "../../entities/load.entity";

export default class LoadSeed {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async one(): Promise<Load> {
    const load = new Load();
    load.carrierFee = faker.datatype.number();
    load.isActive = true;
    load.carrier = await this.createCarrier();

    return this.db.manager.save(load);
  }

  async many(count = 10): Promise<Load[]> {
    const loads = [];
    for (let i = 0; i < count; i++) {
      const carrier = await this.createCarrier();
      const load = this.getFakeLoad(carrier);
      loads.push(load);
    }

    return await this.db.manager.save(loads);
  }

  async withCarrier(carrier: Carrier, count = 10): Promise<Load[]> {
    const loads = [];
    for (let i = 0; i < count; i++) {
      const load = this.getFakeLoad(carrier);
      loads.push(load);
    }

    return this.db.manager.save(loads);
  }

  async createCarrier(): Promise<Carrier> {
    const carrierSeed = new CarrierSeed(this.db);
    return carrierSeed.one();
  }

  getFakeLoad(carrier: Carrier, isActive = true): Load {
    const load = new Load();

    load.carrierFee = faker.datatype.number();
    load.carrier = carrier;
    load.isActive = isActive;
    load.dueDate = faker.datatype.datetime();

    return load;
  }
}
