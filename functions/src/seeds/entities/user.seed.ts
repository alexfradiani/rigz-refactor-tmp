import * as faker from "faker";

import { batcher } from "../../services/common";
import { userCollection } from "../../models/user";

interface UserObj {
  name: string;
  role: string;
}

export default class UserSeed {
  async one(): Promise<void> {}

  async many(count = 10): Promise<string[]> {
    try {
      const usersData = [];
      for (let index = 0; index < count; index++) {
        usersData.push(this.getFakeUser());
      }

      return await batcher.write(userCollection, usersData);
    } catch (error) {
      console.log(error, "UserSeed insert many failed");
      throw error;
    }
  }

  getFakeUser(): UserObj {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      role: "mocked-role"
    };
  }
}
