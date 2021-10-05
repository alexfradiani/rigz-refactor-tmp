import { CLIMethod } from "../cli";
import { db } from "../../services/common";
import * as faker from "faker";
import { userCollection } from "../../models/user";

export default class UserSeed implements CLIMethod {
  async one(): Promise<string> {
    try {
      const result = await db.collection(userCollection).add({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        role: "admin",
      });
      return result.id;
    } catch (error) {
      console.log(error, "UserSeed insert One fails");
      throw error;
    }
  }

  async many(max?: number): Promise<string[]> {
    try {
      const result: string[] = [];
      max = !max ? faker.datatype.number(10) : max;
      const batch = db.batch();

      for (let index = 0; index < max; index++) {
        const newUserRef = db.collection(userCollection).doc();
        batch.set(newUserRef, {
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          role: "admin",
        });
        result.push(newUserRef.id);
      }
      await batch.commit();
      return result;
    } catch (error) {
      console.log(error, "UserSeed insert many fails");
      throw error;
    }
  }
}
