import * as faker from "faker";

import Carrier from "../../entities/carrier.entity";
import FactoringCompany from "../../entities/factoringcompany.entity";
import FactoringCompanySeed from "./factoringcompany.seed";
import PaymentMethod from "../../entities/paymentmethod.entity";
import PaymentMethodService from "../../../services/paymentmethod.service";
import { getManager } from "typeorm";

export interface CarrierSeedProps {
  factoringCompany?: FactoringCompany;
  paymentMethod?: PaymentMethod;
  paymentTerms?: string;
}
export default class CarrierSeed {
  async default(): Promise<void> {
    const fc = (await new FactoringCompanySeed().with({}))[0];
    const carrier = await this.getFakeCarrier(fc);

    await getManager().save(carrier);
  }

  async one(props: CarrierSeedProps = {}): Promise<Carrier> {
    return (await this.with(props))[0];
  }

  async with(props: CarrierSeedProps = {}, count = 1): Promise<Carrier[]> {
    const carriers: Carrier[] = [];
    const fcSeed = new FactoringCompanySeed();
    for (let i = 0; i < count; i++) {
      const { factoringCompany: _fc } = props;
      const fc = _fc ? _fc : await fcSeed.one();
      let carrier = await this.getFakeCarrier(fc);
      carrier = Object.assign(carrier, props);
      carriers.push(carrier);
    }

    console.log(carriers);
    return await getManager().save(carriers);
  }

  async getFakeCarrier(fc: FactoringCompany): Promise<Carrier> {
    const carrier = new Carrier();
    carrier.name = faker.company.companyName();
    carrier.displayId = faker.datatype.string();
    carrier.factoringCompany = fc;
    carrier.paymentTerms = faker.datatype.string();

    const pmSvc = PaymentMethodService.getInstance();
    const pm = await pmSvc.getRandom();
    fc.paymentMethod = pm;

    return carrier;
  }
}
