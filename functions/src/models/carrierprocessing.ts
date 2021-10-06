import {
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from "@google-cloud/firestore";

import User from "./user";

/**
 * Helper model to keep track of users
 * working in the processing page
 */
export default class CarrierProcessing {
  id: string;
  carrierId: string;
  lastUpdate: Date;
  userId: string;

  // associations used by services, need to be populated separately
  user?: User;

  constructor(id: string, carrierId: string, lastUpdate: Date, userId: string) {
    this.id = id;
    this.carrierId = carrierId;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }
}

export const carrierProcessingConvert =
  (): FirestoreDataConverter<CarrierProcessing> => ({
    toFirestore: (data: CarrierProcessing) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      const data = snap.data();
      const processing = new CarrierProcessing(
        snap.id,
        data.carrierId,
        data.lastUpdate,
        data.userId
      );
      return processing;
    }
  });
