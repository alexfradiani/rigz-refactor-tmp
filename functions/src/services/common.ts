import * as admin from "firebase-admin";

import { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../../serviceAccountKey.test.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export const db = admin.firestore();

export interface ModelInterface {
  id: string;
  init: () => void;
}

/**
 * Generic Converter to integrate TS Objects with Firestore Documents
 */
export const converter = <T extends ModelInterface>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const t = snap.data() as T;
    t.id = snap.id;
    return t;
  }
});
