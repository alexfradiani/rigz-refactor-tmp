import "reflect-metadata";

import { DB } from "../config";
import DBService from "../services/db.service";
import ProcessingPageSeed from "../database/seeds/cases/processingpage.seed";
import { ProcessingRow } from "../services/carrier.service";
import app from "../app";
import { createConnection } from "typeorm";
import request from "supertest";

describe("requesting carriers", () => {
  beforeAll(async () => {
    await DBService.clear();

    const db = await createConnection(DB);
    try {
      const procSeeder = new ProcessingPageSeed(db);
      await procSeeder.one();
    } catch (e) {
      console.log(e);
    }
    await db.close();
  });

  it("returns records for the processing page", async () => {
    const reqbody = {
      page: {
        pageNumber: 0,
        size: 100
      },
      orderBy: "carrierId",
      filters: []
    };
    const response = await request(app)
      .get("/carriers/getProcessing")
      .send(reqbody);
    expect(Array.isArray(response.body)).toBe(true);
    expect((response.body as Array<ProcessingRow>).length).toEqual(100);
  });

  it("returns error with wrong request params", async () => {
    const reqbody = { invalidParam: "wrong-request" };
    const response = await request(app)
      .get("/carriers/getProcessing")
      .send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
