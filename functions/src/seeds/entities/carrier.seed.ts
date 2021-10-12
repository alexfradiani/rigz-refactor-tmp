import * as faker from "faker";

import { CLIMethod } from "../cli";
import FactoringCompanySeed from "./factoringCompany.seed";
import { batcher } from "../../services/common";
import { carrierCollection } from "../../models/carrier";

interface CarrierObj {
  displayId: string;
  name: string;
  paymentTerms: string;
  factoringCompanyId: string;
}

export default class CarrierSeed implements CLIMethod {
  private async createFactoringCompany(): Promise<string> {
    const factoringCompanySeed = new FactoringCompanySeed();
    return await factoringCompanySeed.one();
  }

  async one(): Promise<string> {
    const fcId = await this.createFactoringCompany();
    const results = await batcher.write(carrierCollection, [
      this.getFakeCarrier(fcId)
    ]);
    return results[0];
  }

  async many(count = 10): Promise<string[]> {
    try {
      const carriersData = [];
      for (let index = 0; index < count; index++) {
        const fcId = await this.createFactoringCompany();
        carriersData.push(this.getFakeCarrier(fcId));
      }

      return await batcher.write(carrierCollection, carriersData);
    } catch (error) {
      console.log(error, "CarrierSeed insert many failed");
      throw error;
    }
  }

  getFakeCarrier(factoringCompanyId = ""): CarrierObj {
    return {
      displayId: `${faker.datatype.number()}`,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      paymentTerms: `${faker.datatype.number(30)} days`,
      factoringCompanyId
    };
  }
}
