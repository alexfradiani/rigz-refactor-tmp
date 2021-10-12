import * as faker from "faker";

import { CLIMethod } from "../cli";
import { batcher } from "../../services/common";
import { factoringCompaniesCollection } from "../../models/factoringcompany";

export default class FactoringCompanySeed implements CLIMethod {
  async one(): Promise<string> {
    try {
      const results = await batcher.write(factoringCompaniesCollection, [
        {
          name: `${faker.company.companyName()} Factoring Co.`
        }
      ]);
      return results[0];
    } catch (error) {
      console.log(error, "FactoringCompany insert One failed");
      throw error;
    }
  }

  async many(): Promise<void> {}
}
