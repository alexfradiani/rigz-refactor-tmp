import Carrier, { carrierConvert } from "../models/carrier";
import Load, { loadConvert } from "../models/load";

import CarrierProcessingService from "./carrierprocessing";
import CollectionBoardService from "./collectionboard";
import FactoringCompanyService from "./factoringcompany";
import FinancialTransactionService from "./financialtransaction";
import { db } from "./common";

export default class CarrierService {
  async getById(id: string) {
    const doc = await db
      .collection("carriers")
      .withConverter(carrierConvert())
      .doc(id)
      .get();

    return doc.data();
  }

  async getLoads(carrierId: string) {
    const loadDocs = await this.withLoads()
      .where("carrierId", "==", carrierId)
      .get();
    if (loadDocs.empty) return [];

    const loads: Load[] = [];
    loadDocs.forEach((doc) => loads.push(doc.data()));
    return loads;
  }

  async getProcessing() {
    const docSnap = await this.withLoads()
      .where("isActive", "==", true)
      .orderBy("dueDate")
      .get();
    const carriers: Carrier[] = [];
    for (const doc of docSnap.docs) {
      const load = doc.data();
      let carrier = carriers.find((c) => c.id === load.carrierId);
      if (!carrier) {
        carrier = (await this.getById(load.carrierId)) as Carrier;
        carriers.push(carrier);
      }
      carrier.loads.push(load);
    }

    return this.processingPageData(carriers);
  }

  async processingPageData(carriers: Carrier[]) {
    const factoringSvc = new FactoringCompanyService();
    const collectionSvc = new CollectionBoardService();
    const processingSvc = new CarrierProcessingService();
    const transactionsSvc = new FinancialTransactionService();
    const viewData = [];
    for (const carrier of carriers) {
      const factoringCompany = await factoringSvc.getById(
        carrier.factoringCompanyId
      );
      const factoringName = factoringCompany ? factoringCompany.name : "";
      const data = {
        oldestDueDate: this.getOldestDueDate(carrier),
        displayId: carrier.displayId,
        name: carrier.name,
        factoringName,
        loads: carrier.loads,
        payAmount: await transactionsSvc.getPayAmount(carrier.loads),
        cbAmount: (await collectionSvc.getLastCB(carrier.id)).carrierBalance,
        paymentTerms: carrier.paymentTerms,
        activeUsers: await processingSvc.getUsersForCarrier(carrier.id)
      };
      viewData.push(data);
    }
    return viewData;
  }

  async getOldestDueDate(carrier: Carrier) {
    const oldest = carrier.loads.reduce((previous, current) => {
      if (previous.dueDate < current.dueDate) return previous;
      return current;
    });
    return oldest.dueDate;
  }

  async getCBAmount(carrierId: string) {}

  withLoads() {
    return db.collection("loads").withConverter(loadConvert());
  }
}
