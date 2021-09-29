import { converter, db } from "./common";

import Carrier from "../models/carrier";
import Load from "../models/load";

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
    const doc = await db
      .collection("carriers")
      .withConverter(converter<Carrier>())
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

  async getActiveLoads(carrierId: string) {
    // const loadDocs = this.withLoads().where("carrierId", "==", carrierId);
  }

  withLoads() {
    return db.collection("loads").withConverter(converter<Load>());
  }
}
