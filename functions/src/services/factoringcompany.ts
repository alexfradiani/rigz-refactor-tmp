import { db } from "./common";
import { factoringCompanyConvert } from "../models/factoringcompany";

export default class FactoringCompanyService {
  async getById(factoringId: string) {
    const doc = await db
      .collection("factoringCompanies")
      .withConverter(factoringCompanyConvert())
      .doc(factoringId)
      .get();

    return doc.data();
  }
}