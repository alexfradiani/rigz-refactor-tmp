import * as faker from "faker";

import { Connection } from "typeorm";
import User from "../../entities/user.entity";

export default class UserSeed {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async one(): Promise<void> {
    // TODO
  }

  async many(count = 10): Promise<User[]> {
    const users = [];
    for (let index = 0; index < count; index++) {
      users.push(this.getFakeUser());
    }

    return await this.db.manager.save(users);
  }

  getFakeUser(): User {
    const user = new User();
    user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    user.role = "mocked-role";

    return user;
  }
}
