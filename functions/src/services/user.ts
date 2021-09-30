import { db } from "./common";
import { userConvert } from "../models/user";

export default class UserService {
  async getById(userId: string) {
    const doc = await db
      .collection("users")
      .withConverter(userConvert())
      .doc(userId)
      .get();

    return doc.data();
  }
}
