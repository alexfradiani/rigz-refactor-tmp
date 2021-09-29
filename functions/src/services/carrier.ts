import { converter, db } from "./common";

import Carrier from "@models/carrier";
import Load from "@models/load";

export default class CarrierService {
  private static instance: CarrierService;


  public static getInstance(): CarrierService {
    if (!this.instance) {
      this.instance = new CarrierService();
    }

    return this.instance;
  }

  private constructor(){};

  async getById(id: string) {
    try {
      const doc = await db
      .collection("carriers")
      .withConverter(converter<Carrier>())
      .doc(id)
      .get();

    return doc.data();  
    } catch (error) {
      let errorMessage = `Error trying to getCarrierById:${id}`;

      if (error instanceof Error)
        errorMessage = `${errorMessage}, err:${error.message}, stack:${error.stack}`;

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

      if (error instanceof Error)
        errorMessage = `${errorMessage}, err:${error.message}, stack:${error.stack}`;

      throw new Error(errorMessage);
    }
  }

  async getActiveLoads(carrierId: string) {
    // const loadDocs = this.withLoads().where("carrierId", "==", carrierId);
  }

  async createCarrier(carrier: Carrier) {
    try {
      return this.writeNewCarrier(carrier);
    } catch (error) {
      let errorMessage = 'Error trying to createCarrier';

      if (error instanceof Error)
        errorMessage = `${errorMessage}, err:${error.message}, stack:${error.stack}`;

      throw new Error(errorMessage);
    }
  }

  withLoads() {
    return db.collection("loads").withConverter(converter<Load>());
  }

  private async writeNewCarrier(carrier: Carrier) {
    carrier.id = db.collection('carriers').doc().id;
    await db.doc(`carriers/${carrier.id}`).set(carrier);
    return carrier.id;
  }
}
