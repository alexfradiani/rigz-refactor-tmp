import { Filter, Page } from "../utils";

import { DB } from "../config";
import { createConnection } from "typeorm";

export type ProcessingRow = {
  carrierId: string;
  carrierDisplayId: string;
  carrierName: string;
  factoringCompanyName: string;
  loadIds: string;
  lastCarrierAmount: number;
  lastCarrierCB: number;
};

export default class CarrierService {
  private static instance: CarrierService;

  public static getInstance(): CarrierService {
    if (!this.instance) {
      this.instance = new CarrierService();
    }

    return this.instance;
  }

  async getProcessing(
    page: Page,
    filters: Filter[],
    orderBy: string
  ): Promise<ProcessingRow[]> {
    const db = await createConnection(DB);

    const query = {
      conditions: this.conditionFilters(filters),
      limit: `limit ${page.pageNumber * page.size}, ${page.size}`,
      order: orderBy ? `order by ${orderBy}` : ""
    };

    const rows: ProcessingRow[] = await db.manager.query(
      `select * from processing_page 
      ${query.conditions} 
      ${query.order} 
      ${query.limit};`
    );

    await db.close();
    return rows;
  }

  conditionFilters(filters: Filter[]): string {
    let query = "";
    if (!filters.length) return "";

    filters.map((filter) => {
      const prefix = query ? "and " : "where ";
      query += `${prefix} 
        concat(${filter.field}, '') like \`%${filter.value}%\``;
    });

    return query;
  }
}
