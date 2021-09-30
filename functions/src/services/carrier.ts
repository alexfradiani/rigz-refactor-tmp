import Carrier from "../models/carrier";
import { CollectionReference } from "@google-cloud/firestore";
import Load from "../models/load";
import { db } from "./common";

export default class CarrierService {
  private static instance: CarrierService;
  private constructor() {}

  public static getInstance(): CarrierService {
    if (!this.instance) {
      this.instance = new CarrierService();
    }

    return this.instance;
  }

  async getById(id: string): Promise<Carrier> {
    try {
      const doc = await db
        .collection("carriers")
        .withConverter(converter<Carrier>())
        .doc(id)
        .get();

      return doc.data() || ({} as Carrier);
    } catch (error) {
      let errorMessage = `Error trying to getCarrierById:${id}`;

      if (error instanceof Error) {
        errorMessage = `${errorMessage},
          err:${error.message}, stack:${error.stack}`;
      }

      throw new Error(errorMessage);
    }
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

  withLoads(): CollectionReference<Load> {
    // TODO: link with converter
    // return db.collection("loads").withConverter(converter<Load>());
  }
}
