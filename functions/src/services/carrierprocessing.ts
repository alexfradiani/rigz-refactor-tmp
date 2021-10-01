import CarrierProcessing, {
  carrierProcessingConvert
} from "../models/carrierprocessing";

import User from "../models/user";
import UserService from "./user";
import { db } from "./common";

export default class CarrierProcessingService {
  async getEntriesForCarrier(carrierId: string) {
    const userSvc = new UserService();

    const docSnap = await db
      .collection("carrierProcessing")
      .withConverter(carrierProcessingConvert())
      .where("carrierId", "==", carrierId)
      .get();

    const entries: CarrierProcessing[] = [];
    for (const doc of docSnap.docs) {
      const processingEntry = doc.data();
      processingEntry.user = await userSvc.getById(processingEntry.userId);
      entries.push(processingEntry);
    }

    return entries;
  }

  /** helper method to extract just the users from the processing entries */
  async getUsersForCarrier(carrierId: string): Promise<User[]> {
    const users: User[] = [];
    return users;
  }
}
