import * as faker from "faker";

import User from "../../entities/user.entity";
import { getManager } from "typeorm";

interface UserSeedProps {
  name?: string;
  role?: string;
}
export default class UserSeed {
  async default(): Promise<void> {
    const user = this.getFakeUser();
    await getManager().save(user);
  }

  async with(props: UserSeedProps, count = 1): Promise<User[]> {
    const users = [];
    for (let index = 0; index < count; index++) {
      const user = this.getFakeUser();
      const { name, role } = props;
      if (name) user.name = name;
      if (role) user.role = role;
      users.push(user);
    }

    return await getManager().save(users);
  }

  getFakeUser(): User {
    const user = new User();
    user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    user.role = "mocked-role";

    return user;
  }
}
