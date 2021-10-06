import {
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from "@google-cloud/firestore";

export default class FinancialTransaction {
  id: string;
  carrierAmount: number;
  carrierCBAmount: number;
  carrierPending: number;
  customerAmount: number;
  date: Date;
  loadId: string;
  loadProfitAmount: number;
  type: string;

  constructor(
    id: string,
    carrierAmount: number,
    carrierCBAmount: number,
    carrierPending: number,
    customerAmount: number,
    date: Date,
    loadId: string,
    loadProfitAmount: number,
    type: string
  ) {
    this.id = id;
    this.carrierAmount = carrierAmount;
    this.carrierCBAmount = carrierCBAmount;
    this.carrierPending = carrierPending;
    this.customerAmount = customerAmount;
    this.date = date;
    this.loadId = loadId;
    this.loadProfitAmount = loadProfitAmount;
    this.type = type;
  }
}

export const financialTransactionConvert =
  (): FirestoreDataConverter<FinancialTransaction> => ({
    toFirestore: (data: FinancialTransaction) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      const data = snap.data();
      const ft = new FinancialTransaction(
        snap.id,
        data.carrierAmount,
        data.carrierCBAmount,
        data.carrierPending,
        data.customerAmount,
        data.date,
        data.loadId,
        data.loadProfitAmount,
        data.type
      );
      return ft;
    }
  });
