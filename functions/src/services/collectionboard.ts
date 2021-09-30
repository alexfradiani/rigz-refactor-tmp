import { collectionBoardConvert } from "../models/collectionboard";
import { db } from "./common";

export default class CollectionBoardService {
  async getLastCB(carrierId: string) {
    const docs = await db
      .collection("collectionBoard")
      .withConverter(collectionBoardConvert())
      .where("carrierId", "==", carrierId)
      .orderBy("date", "desc")
      .limit(1)
      .get();

    return docs.docs[0].data();
  }
}
