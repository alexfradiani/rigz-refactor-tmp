import User, { userConvert } from "../models/user";

import { db } from "./common";

export default class UserService {
  async getById(userId: string): Promise<User> {
    const doc = await db
      .collection("users")
      .withConverter(userConvert())
      .doc(userId)
      .get();

    return doc.data() as User;
  }
}
