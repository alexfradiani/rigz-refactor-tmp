import { CLIMethod } from "../cli";
import { db } from "../../services/common";
import * as faker from "faker";
import { factoringCompaniesCollection } from "../../models/factoringcompany";

export default class FactoringCompanySeed implements CLIMethod {
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

  async many(max?: number): Promise<string[]> {
    try {
      const result: string[] = [];
      max = !max ? faker.datatype.number(30) : max;
      const batch = db.batch();

      for (let index = 0; index < max; index++) {
        const newFactoringCoRef = db
          .collection(factoringCompaniesCollection)
          .doc();

        batch.set(newFactoringCoRef, {
          name: `${faker.company.companyName} Factoring Co.`,
        });

        result.push(newFactoringCoRef.id);
      }

      await batch.commit();
      return result;
    } catch (error) {
      console.log(error, "FactoringCompany insert many fails");
      throw error;
    }
  }
}
