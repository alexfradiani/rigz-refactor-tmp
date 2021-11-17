import { createConnection, getConnection } from "typeorm";

import { DB } from "../config";

export default class DBService {
  static async init(): Promise<void> {
    try {
      const connection = getConnection();
      if (!connection.isConnected) throw new Error();
    } catch (e) {
      console.log("get connection failed. trying new one");
      await createConnection(DB);
    }
  }

  static async close(): Promise<void> {
    try {
      await getConnection().close();
    } catch (e) {
      console.log("Could not close connection. It was already closed.");
    }
  }

  static async clear(): Promise<void> {
    const db = getConnection();

    /**
     * It is necessary to delete tables in this order
     * to avoid foreign constraints issues
     */
    try {
      await db.manager.query("delete from `user`;");
      await db.manager.query("delete from financial_transaction;");
      await db.manager.query("delete from payment_hold;");
      await db.manager.query("delete from `load`;");
      await db.manager.query("delete from collection_board;");
      await db.manager.query("delete from carrier;");
      await db.manager.query("delete from factoring_company;");
      await db.manager.query("delete from payment_hold_type;");
      await db.manager.query("delete from payment_method;");
    } catch (e) {
      console.log("error clearing DB. ", e);
    }
  }
}
