import * as faker from "faker";

import Carrier from "../../entities/carrier.entity";
import CarrierSeed from "./carrier.seed";
import FactoringCompany from "../../entities/factoringcompany.entity";
import Load from "../../entities/load.entity";
import { getManager } from "typeorm";

export interface LoadSeedProps {
  factoringCompany?: FactoringCompany;
  carrier?: Carrier;
  doNotPayFactoring?: boolean;
  isActive?: boolean;
}
export default class LoadSeed {
  async default(): Promise<void> {
    const carrier = (await new CarrierSeed().with({}))[0];
    const load = this.getFakeLoad(carrier);

    await getManager().save(load);
  }

  async one(props: LoadSeedProps): Promise<Load> {
    return (await this.with(props))[0];
  }

  async with(props: LoadSeedProps, count = 1): Promise<Load[]> {
    const loads: Load[] = [];
    const carrierSeed = new CarrierSeed();
    for (let i = 0; i < count; i++) {
      const { carrier: ca } = props;
      const carrier = ca ? ca : await carrierSeed.one();
      let load = this.getFakeLoad(carrier);
      load = Object.assign(load, props);
      loads.push(load);
    }
    return getManager().save(loads);
  }

  getFakeLoad(carrier: Carrier): Load {
    const load = new Load();

    load.carrierFee = faker.datatype.number();
    load.carrier = carrier;
    load.isActive = true;
    load.dueDate = faker.datatype.datetime();

    return load;
  }
}
