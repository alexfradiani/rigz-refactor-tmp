import { Filter, Page, Paginator } from "../utils";
import { getManager, getRepository } from "typeorm";

import DBService from "./db.service";
import PaymentMethod from "../database/entities/paymentmethod.entity";
import { createObjectCsvWriter } from "csv-writer";

export type ProcessingRow = {
  carrierId: string;
  carrierDisplayId: string;
  carrierName: string;
  factoringCompanyName: string;
  loadIds: string;
  lastCarrierAmount: number;
  lastCarrierCB: number;
  payTerms: string;
  paymentMethodId: number;
  username: string;
};

export type HoldRow = {
  dueDate: Date;
  loadNumber: string;
  carrierName: string;
  factoringCompanyName: string;
  lastLoadProfitAmount: string;
  paymentTerms: string;
  holdType: string;
};

export default class CarrierService {
  private static instance: CarrierService;

  public static getInstance(): CarrierService {
    if (!this.instance) {
      this.instance = new CarrierService();
    }

    return this.instance;
  }

  validReq(body: any): boolean {
    if (!body.tab || !body.page || !body.orderBy || !body.filters) {
      return false;
    }

    return true;
  }

  async getProcessing(
    tab: string,
    page: Page,
    filters: Filter[],
    orderBy: string
  ): Promise<ProcessingRow[]> {
    await DBService.init();
    const pm = await getRepository(PaymentMethod).findOne({ name: tab });
    const tabId = pm ? pm.id : 0;
    const query = {
      conditions: `where paymentMethodId = ${tabId} 
        ${this.conditionFilters(filters, true)}`,
      order: orderBy ? `order by ${orderBy}` : "",
      limit: Paginator.toSQL(page)
    };

    const rows: ProcessingRow[] = await getManager().query(
      `select * from processing_page 
      ${query.conditions} 
      ${query.order} 
      ${query.limit};`
    );
    await DBService.close();
    return rows;
  }

  conditionFilters(filters: Filter[], precondition = false): string {
    let query = "";

    filters.map((filter) => {
      const prefix = !query && !precondition ? "where" : "and";
      query += `${prefix} 
        concat(${filter.field}, '') like \`%${filter.value}%\``;
    });

    return `${query}`;
  }

  async getProcessingHolds(
    page: Page,
    filters: Filter[],
    orderBy: string
  ): Promise<HoldRow[]> {
    await DBService.init();
    const query = {
      conditions: filters.length > 0 ? `${this.conditionFilters(filters)}` : "",
      order: orderBy ? `order by ${orderBy}` : "",
      limit: Paginator.toSQL(page)
    };

    const rows: HoldRow[] = await getManager().query(
      `select * from load_holds 
      ${query.conditions} 
      ${query.order} 
      ${query.limit};`
    );
    await DBService.close();
    return rows;
  }

  async getProcessingCSV(): Promise<string | void> {
    await DBService.init();
    try {
      const rows: ProcessingRow[] = await getManager().query(
        "select * from processing_page"
      );

      const filePath = `${__dirname}/processing_${Date.now()}.csv`;
      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: [
          { id: "carrierId", title: "carrierId" },
          { id: "carrierDisplayId", title: "carrierDisplayId" },
          { id: "carrierName", title: "carrierName" },
          { id: "factoringCompanyName", title: "factoringCompanyName" },
          { id: "loadIds", title: "loadIds" },
          { id: "lastCarrierAmount", title: "lastCarrierAmount" },
          { id: "lastCarrierCB", title: "lastCarrierCB" }
        ]
      });
      await csvWriter.writeRecords(rows);
      return filePath;
    } catch (e) {
      console.log(e);
    }
    await DBService.close();
  }
}
