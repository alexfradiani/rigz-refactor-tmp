import { db } from "../../services/common";
import * as faker from "faker";
import { carrierCollection } from "../../models/carrier";
import FactoringCompanySeed from "./factoringCompany.seed";
import CollectionBoardSeed from "./collectionBoard.seed";
import UserSeed from "./user.seed";
import CarrierProcessingSeed from "./carrierProcessing.seed";

export default class CarrierSeed {
  private async createFactoringCompany(): Promise<string> {
    const factoringCompanySeed = new FactoringCompanySeed();
    return await factoringCompanySeed.one();
  }

  async manyToProcessingPage(max: number): Promise<string[]> {
    try {
      const carrierIds: string[] = [];
      max = !max ? 1200 : max;

      for (let index = 0; index < max; index++) {
        const factoringCompanyId = await this.createFactoringCompany();
        const result = await db.collection(carrierCollection).add({
          displayId: `${faker.datatype.number()}`,
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          paymentTerms: `${faker.datatype.number(30)} days`,
          factoringCompanyId: factoringCompanyId
        });
        carrierIds.push(result.id);
      }

      // Seeding Users and CarrierProcessing
      const userIds = await new UserSeed().many(carrierIds.length);
      await new CarrierProcessingSeed().manyWithCarriersAndUsersIds(
        carrierIds.length,
        carrierIds,
        userIds
      );

      // Seeding CollectionBoard
      await new CollectionBoardSeed().manyWithCarrierIds(
        carrierIds.length,
        carrierIds
      );

      return carrierIds;
    } catch (error) {
      console.log(error, "CarrierSeed insert many fails");
      throw error;
    }
  }
}
