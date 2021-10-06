import FactoringCompany, {
  factoringCompaniesCollection,
  factoringCompanyConvert
} from "../models/factoringcompany";

import { db } from "./common";

export default class FactoringCompanyService {
  async getById(factoringId: string): Promise<FactoringCompany> {
    const doc = await db
      .collection(factoringCompaniesCollection)
      .withConverter(factoringCompanyConvert())
      .doc(factoringId)
      .get();

    return doc.data() as FactoringCompany;
  }
}
