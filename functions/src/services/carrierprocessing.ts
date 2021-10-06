import CarrierProcessing, {
  carrierProcessingCollection,
  carrierProcessingConvert
} from "../models/carrierprocessing";

import User from "../models/user";
import UserService from "./user";
import { db } from "./common";

export default class CarrierProcessingService {
  async getEntriesForCarrier(carrierId: string): Promise<CarrierProcessing[]> {
    const userSvc = new UserService();

    const docSnap = await db
      .collection(carrierProcessingCollection)
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
    const entries = await this.getEntriesForCarrier(carrierId);

    entries.forEach((entry) => {
      users.push(entry.user as User);
    });

    return users;
  }
}
