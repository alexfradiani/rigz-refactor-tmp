import { db } from "../../services/common";
import * as faker from "faker";
import { factoringCompaniesCollection } from "../../models/factoringcompany";

export default class FactoringCompanySeed {
  async one(): Promise<string> {
    try {
      const result = await db.collection(factoringCompaniesCollection).add({
        name: `${faker.company.companyName()} Factoring Co.`,
      });

      return result.id;
    } catch (error) {
      console.log(error, "FactoringCompany insert One fails");
      throw error;
    }
  }
}
