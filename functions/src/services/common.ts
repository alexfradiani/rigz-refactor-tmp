import * as admin from "firebase-admin";

import Batcher from "../utils/batcher";
import { ServiceAccount } from "firebase-admin";
import { USE_FIRESTORE_EMULATOR } from "../config";
import serviceAccount from "../../../serviceAccountKey.test.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

const fstore: FirebaseFirestore.Firestore = admin.firestore();

if (USE_FIRESTORE_EMULATOR) {
  fstore.settings({
    host: "localhost:8080",
    ssl: false
  });
}

export const db = fstore;

export const batcher = new Batcher(db);
