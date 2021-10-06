import { db } from "../../services/common";
import * as faker from "faker";
import { carrierProcessingCollection } from "../../models/carrierprocessing";

export default class CarrierProcessingSeed {
  async manyWithCarriersAndUsersIds(
    max: number,
    carrierIds: string[],
    userIds: string[]
  ): Promise<string[]> {
    try {
      const result: string[] = [];

      for (let index = 0; index < max; index++) {
        const newCarrierProcessiing = await db
          .collection(carrierProcessingCollection)
          .add({
            carrierId: carrierIds[index],
            lastUpdate: faker.datatype.datetime(),
            userId: userIds[index]
          });

        result.push(newCarrierProcessiing.id);
      }

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
