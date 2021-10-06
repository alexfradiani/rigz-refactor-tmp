import {
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from "@google-cloud/firestore";

export default class User {
  id: string;
  name: string;
  role: string;

  constructor(id: string, name: string, role: string) {
    this.id = id;
    this.name = name;
    this.role = role;
  }
}

export const userConvert = (): FirestoreDataConverter<User> => ({
  toFirestore: (data: User) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data();
    const user = new User(snap.id, data.name, data.role);
    return user;
  }
});

export const userCollection = "users";
