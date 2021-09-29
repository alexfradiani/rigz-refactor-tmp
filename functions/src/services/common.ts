/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable valid-jsdoc */
import * as admin from "firebase-admin";

import { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../../serviceAccountKey.test.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export const db = admin.firestore();

export interface WithId {
  id: string;
}

/**
 * Generic Converter to integrate TS Objects with Firestore Documents
 */
export const converter = <T extends WithId>()=> ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const t = snap.data() as T;
    t.id = snap.id;
    return t;
  }
});
