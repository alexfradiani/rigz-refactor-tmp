import { db } from "../../services/common";
import * as faker from "faker";
import { userCollection } from "../../models/user";

export default class UserSeed {
  async many(maxAmountofUsers: number): Promise<string[]> {
    try {
      const result: string[] = [];

      for (let index = 0; index < maxAmountofUsers; index++) {
        const userCreated = await db.collection(userCollection).add({
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          role: "admin",
        });
        result.push(userCreated.id);
      }
      return result;
    } catch (error) {
      console.log(error, "UserSeed insert many fails");
      throw error;
    }
  }
}
