import * as admin from "firebase-admin";

import { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../../serviceAccountKey.test.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export const db = admin.firestore();
