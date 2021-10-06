import { db } from "../../services/common";
import * as faker from "faker";
import { collectionBoardCollection } from "../../models/collectionboard";

export default class CollectionBoardSeed {
  async manyWithCarrierIds(
    max: number,
    carrierIds: string[]
  ): Promise<string[]> {
    try {
      const result: string[] = [];
      max = !max ? carrierIds.length : max;

      carrierIds.map(async (carrierId) => {
        for (let index = 0; index < max; index++) {
          const collectionBoardCreated = await db
            .collection(collectionBoardCollection)
            .add({
              carrierId: carrierId,
              carrierBalance: faker.datatype.number(),
              date: faker.datatype.datetime(),
              displayId: `${faker.datatype.number()}`
            });
          result.push(collectionBoardCreated.id);
        }
      });

      return result;
    } catch (error) {
      console.log(error, "CarrierSeed insert many fails");
      throw error;
    }
  }
}
