import Carrier from "./carrier";
import { FirestoreDataConverter } from "@google-cloud/firestore";

export default class Load {
  id: string;
  carrierFee: number;
  carrierId: string;
  isActive: boolean;
  dueDate: Date;

  // associations used by services, need to be populated separately
  carrier?: Carrier;

  constructor(
    id: string,
    carrierFee: number,
    carrierId: string,
    isActive: boolean,
    dueDate: Date
  ) {
    this.id = id;
    this.carrierFee = carrierFee;
    this.carrierId = carrierId;
    this.isActive = isActive;
    this.dueDate = dueDate;
  }
}

export const loadConvert = (): FirestoreDataConverter<Load> => ({
  toFirestore: (data: Load) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = snap.data();
    const load = new Load(
      snap.id,
      data.carrierFee,
      data.carrierId,
      data.isActive,
      data.dueDate
    );
    return load;
  }
});
