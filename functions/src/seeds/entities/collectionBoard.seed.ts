import { CLIMethod } from "../cli";
import { db } from "../../services/common";
import * as faker from "faker";
import CarrierSeed from "./carrier.seed";
import { collectionBoardCollection } from "../../models/collectionboard";

export default class CollectionBoardSeed implements CLIMethod {
  async one(): Promise<string> {
    try {
      const carrierId = await new CarrierSeed().one();
      const result = await db.collection(collectionBoardCollection).add({
        carrierId: carrierId,
        carrierBalance: faker.datatype.number(),
        date: faker.datatype.datetime(),
        displayId: `${faker.datatype.number()}`
      });
      return result.id;
    } catch (error) {
      console.log(error, "CollectionBoardSeed insert One fails");
      throw error;
    }
  }

  async many(max?: number): Promise<string[]> {
    try {
      const result: string[] = [];
      max = !max ? faker.datatype.number(10) : max;
      const batch = db.batch();

      for (let index = 0; index < max; index++) {
        const carrierId = await new CarrierSeed().one();
        const newCollectionBoardRef = db
          .collection(collectionBoardCollection)
          .doc();

        batch.set(newCollectionBoardRef, {
          carrierId: carrierId,
          carrierBalance: faker.datatype.number(),
          date: faker.datatype.datetime(),
          displayId: `${faker.datatype.number()}`
        });
        result.push(newCollectionBoardRef.id);
      }
      await batch.commit();
      return result;
    } catch (error) {
      console.log(error, "CarrierSeed insert many fails");
      throw error;
    }
  }

  async manyWithCarrierIds(
    max: number,
    carrierIds: string[]
  ): Promise<string[]> {
    try {
      const result: string[] = [];
      max = !max ? carrierIds.length : max;
      const batch = db.batch();

      carrierIds.map((carrierId) => {
        for (let index = 0; index < max; index++) {
          const newCollectionBoardRef = db
            .collection(collectionBoardCollection)
            .doc();

          batch.set(newCollectionBoardRef, {
            carrierId: carrierId,
            carrierBalance: faker.datatype.number(),
            date: faker.datatype.datetime(),
            displayId: `${faker.datatype.number()}`
          });
          result.push(newCollectionBoardRef.id);
        }
      });
      batch.commit();
      return result;
    } catch (error) {
      console.log(error, "CarrierSeed insert many fails");
      throw error;
    }
  }
}
