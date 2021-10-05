import { db } from "./common";
import {
  factoringCompaniesCollection,
  factoringCompanyConvert
} from "../models/factoringcompany";

export default class FactoringCompanyService {
  async getById(factoringId: string) {
    const doc = await db
      .collection(factoringCompaniesCollection)
      .withConverter(factoringCompanyConvert())
      .doc(factoringId)
      .get();

    return doc.data();
  }
}
