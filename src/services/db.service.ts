import { DB } from "../config";
import { createConnection } from "typeorm";

/**
 * Only for testing
 */
export default class DBService {
  static async clear(): Promise<void> {
    const db = await createConnection(DB);

    /**
     * It is necessary to delete tables in this order
     * in order to avoid foreign constraints issues
     */
    try {
      await db.manager.query("delete from `user`;");
      await db.manager.query("delete from financial_transaction;");
      await db.manager.query("delete from `load`;");
      await db.manager.query("delete from collection_board;");
      await db.manager.query("delete from carrier;");
      await db.manager.query("delete from factoring_company;");
    } catch (e) {
      console.log(e);
    }

    await db.close();
  }
}
