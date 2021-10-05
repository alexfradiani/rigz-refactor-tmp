import { CLIMethod } from "../cli";
import { db } from "../../services/common";
import * as faker from "faker";
import { carrierProcessingCollection } from "../../models/carrierprocessing";
import UserSeed from "./user.seed";
import CarrierSeed from "./carrier.seed";

export default class CarrierProcessingSeed implements CLIMethod {
  async one(): Promise<string> {
    try {
      const carrierId = await new CarrierSeed().one();
      const userId = await new UserSeed().one();
      const result = await db.collection(carrierProcessingCollection).add({
        carrierId: carrierId,
        lastUpdate: faker.datatype.datetime(),
        userId: userId
      });

      return result.id;
    } catch (error) {
      console.log(error, "CarrierProcessing insert one fails");
      throw error;
    }
  }

  async many(max?: number): Promise<string[]> {
    try {
      const result: string[] = [];
      const maxCarrierProcessing = !max ? faker.datatype.number(30) : max;
      const batch = db.batch();

      for (let index = 0; index < maxCarrierProcessing; index++) {
        const carrierId = await new CarrierSeed().one();
        const userId = await new UserSeed().one();
        const newCarrierProcessingRef = db
          .collection(carrierProcessingCollection)
          .doc();

        batch.set(newCarrierProcessingRef, {
          carrierId: carrierId,
          lastUpdate: faker.datatype.datetime(),
          userId: userId
        });

        result.push(newCarrierProcessingRef.id);
      }

      await batch.commit();
      return result;
    } catch (error) {
      console.log(error, "CarrierProcessing insert many fails");
      throw error;
    }
  }

  async manyWithCarriersAndUsersIds(
    max: number,
    carrierIds: string[],
    userIds: string[]
  ): Promise<string[]> {
    try {
      const result: string[] = [];
      const maxCarrierProcessing = !max ? carrierIds.length : max;
      const batch = db.batch();

      for (let index = 0; index < maxCarrierProcessing; index++) {
        const newCarrierProcessingRef = db
          .collection(carrierProcessingCollection)
          .doc();

        batch.set(newCarrierProcessingRef, {
          carrierId: carrierIds[index],
          lastUpdate: faker.datatype.datetime(),
          userId: userIds[index]
        });

        result.push(newCarrierProcessingRef.id);
      }

      await batch.commit();
      return result;
    } catch (error) {
      console.log(
        error,
        "CarrierProcessing insert manyWithCarriersAndUsersIds fails"
      );
      throw error;
    }
  }
}
