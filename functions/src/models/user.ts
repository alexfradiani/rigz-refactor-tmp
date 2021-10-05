import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";

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

export const userConvert = () => ({
  toFirestore: (data: User) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data();
    const user = new User(snap.id, data.name, data.role);
    return user;
  }
});

export const userCollection = "users";
