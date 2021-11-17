import * as faker from "faker";

import FactoringCompany from "../../entities/factoringcompany.entity";
import PaymentMethod from "../../entities/paymentmethod.entity";
import PaymentMethodService from "../../../services/paymentmethod.service";
import { getManager } from "typeorm";

interface FCSeedProps {
  name?: string;
  paymentTerms?: string;
  paymentMethod?: PaymentMethod;
}

export default class FactoringCompanySeed {
  async default(): Promise<FactoringCompany> {
    const fc = await this.getFakeFC();
    return await getManager().save(fc);
  }

  async one(props: FCSeedProps = {}): Promise<FactoringCompany> {
    return (await this.with(props))[0];
  }

  async with(props: FCSeedProps = {}, count = 1): Promise<FactoringCompany[]> {
    const fcs: FactoringCompany[] = [];
    for (let i = 0; i < count; i++) {
      let fc = await this.getFakeFC();
      fc = Object.assign(fc, props);
      fcs.push(fc);
    }

    return await getManager().save(fcs);
  }

  async getFakeFC(): Promise<FactoringCompany> {
    const fc = new FactoringCompany();
    fc.name = faker.company.companyName();
    fc.paymentTerms = `mocked-terms-${fc.name}`;

    const pmSvc = PaymentMethodService.getInstance();
    const pm = await pmSvc.getRandom();
    fc.paymentMethod = pm;

    return fc;
  }
}
