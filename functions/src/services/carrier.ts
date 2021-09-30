import Carrier, { carrierConvert } from "../models/carrier";
import Load, { loadConvert } from "../models/load";

import CarrierProcessingService from "./carrierprocessing";
import CollectionBoardService from "./collectionboard";
import { CollectionReference } from "@google-cloud/firestore";
import FactoringCompanyService from "./factoringcompany";
import FinancialTransactionService from "./financialtransaction";
import User from "../models/user";
import { db } from "./common";

interface ViewData {
  oldestDueDate: Date;
  displayId: string;
  name: string;
  factoringName: string;
  loads: Load[];
  payAmount: number;
  cbAmount: number;
  paymentTerms: string;
  activeUsers: User[];
}
export default class CarrierService {
  private static instance: CarrierService;
  private constructor() {}

  public static getInstance(): CarrierService {
    if (!this.instance) {
      this.instance = new CarrierService();
    }

    return this.instance;
  }

  async createCarrier(carrier: Carrier): Promise<string> {
    try {
      // TODO: finish write process
      return carrier.name;
    } catch (error) {
      let errorMessage = "Error trying to createCarrier";

      if (error instanceof Error) {
        errorMessage = `${errorMessage}, err:${error.message},
          stack:${error.stack}`;
      }

      throw new Error(errorMessage);
    }
  }

  async getById(id: string): Promise<Carrier | undefined> {
    const doc = await db
      .collection("carriers")
      .withConverter(carrierConvert())
      .doc(id)
      .get();

    return doc.data();
  }

  async getLoads(carrierId: string): Promise<Load[]> {
    try {
      const loadDocs = await this.withLoads()
        .where("carrierId", "==", carrierId)
        .get();
      if (loadDocs.empty) return [];

      const loads: Load[] = [];
      loadDocs.forEach((doc) => loads.push(doc.data()));
      return loads;
    } catch (error) {
      let errorMessage = `Error trying to getLoads by carrierId:${carrierId}`;

      if (error instanceof Error) {
        errorMessage = `${errorMessage}, err:${error.message},
          stack:${error.stack}`;
      }

      throw new Error(errorMessage);
    }
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

  async processingPageData(carriers: Carrier[]): ViewData[] {
    const factoringSvc = new FactoringCompanyService();
    const collectionSvc = new CollectionBoardService();
    const processingSvc = new CarrierProcessingService();
    const transactionsSvc = new FinancialTransactionService();
    const viewData: ViewData[] = [];
    for (const carrier of carriers) {
      const factoringCompany = await factoringSvc.getById(
        carrier.factoringCompanyId
      );
      const factoringName = factoringCompany ? factoringCompany.name : "";
      const data: ViewData = {
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

  getOldestDueDate(carrier: Carrier): Date {
    const oldest = carrier.loads.reduce((previous, current) => {
      if (previous.dueDate < current.dueDate) return previous;
      return current;
    });
    return oldest.dueDate;
  }

  withLoads(): CollectionReference {
    return db.collection("loads").withConverter(loadConvert());
  }
}
