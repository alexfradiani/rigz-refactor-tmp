import FinancialTransaction, {
  financialTransactionConvert
} from "../models/financialtransaction";

import { CollectionReference } from "@google-cloud/firestore";
import Load from "../models/load";
import { db } from "./common";

export default class FinancialTransactionService {
  async getPayAmount(loads: Load[]): Promise<number> {
    const transactions = await this.compoundIn(loads);

    const lastTransaction = transactions.reduce((previous, current) => {
      if (previous.date > current.date) return previous;
      return current;
    });
    return lastTransaction.carrierPending;
  }

  /**
   * workaround for firestore IN operator constraint of 10 values
   */
  async compoundIn(loads: Load[]): Promise<FinancialTransaction[]> {
    const chunksLength = Math.ceil(loads.length / 10);
    const transactions: FinancialTransaction[] = [];
    for (let i = 0; i < chunksLength; i++) {
      const loadsChunk = loads.slice(i, i + 10);
      const docs = await this.withFinancialTransactions()
        .where("loadId", "in", this.loadsIds(loadsChunk))
        .get();
      docs.forEach((doc) => transactions.push(doc.data()));
    }

    return transactions;
  }

  loadsIds(loads: Load[]): string[] {
    return loads.map((load) => load.id);
  }

  withFinancialTransactions(): CollectionReference<FinancialTransaction> {
    return db
      .collection("financialTransactions")
      .withConverter(financialTransactionConvert());
  }
}
