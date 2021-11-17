import "reflect-metadata";

import { HoldRow, ProcessingRow } from "../services/carrier.service";

import DBService from "../services/db.service";
import DefaultSeed from "../database/seeds/cases/default.seed";
import PaymentHoldType from "../database/entities/paymentholdtype.entity";
import ProcessingPageSeed from "../database/seeds/cases/processingpage.seed";
import { ValidMethods } from "../database/entities/paymentmethod.entity";
import app from "../app";
import { getRepository } from "typeorm";
import request from "supertest";

const CSVHEAD =
  // eslint-disable-next-line max-len
  "carrierId,carrierDisplayId,carrierName,factoringCompanyName,loadIds,lastCarrierAmount,lastCarrierCB";

const defaultReq = {
  tab: ValidMethods.Check as string,
  page: {
    pageNumber: 0,
    size: 100
  },
  orderBy: "carrierId",
  filters: []
};

const seedWith = async (tcase: string): Promise<void> => {
  try {
    const procSeeder = new ProcessingPageSeed();
    const defaultSeeder = new DefaultSeed();
    await defaultSeeder.default();
    switch (tcase) {
      case "C1":
        await procSeeder.caseC1();
        break;
      case "C2":
        await procSeeder.caseC2();
        break;
      case "C3":
        await procSeeder.caseC3();
        break;
      case "C4":
        await procSeeder.caseC4();
        break;
      default:
        await procSeeder.default();
    }
  } catch (e) {
    console.log(e);
  }
};

describe("requesting carriers", () => {
  beforeEach(async () => {
    await DBService.init();
    await DBService.clear();
  });

  afterAll(async () => {
    await DBService.close();
  });

  it("returns error with wrong request params", async () => {
    const reqbody = { invalidParam: "wrong-request" };
    const response = await request(app)
      .get("/carriers/getProcessing")
      .send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  /**
   * test case C1
   */
  it("filters carriers based on requested paymentMethod", async () => {
    await seedWith("C1");
    for (const name in ValidMethods) {
      const reqbody = Object.assign({}, defaultReq, { tab: name });

      const response = await request(app)
        .get("/carriers/getProcessing")
        .send(reqbody);
      expect(Array.isArray(response.body)).toBe(true);
      expect((response.body as Array<ProcessingRow>).length).toEqual(5);
    }
  });

  /**
   * test case C2
   * cases covered by SQL View: carrier_loads_set_1
   */
  it("shows carrier paymentTerms as expected", async () => {
    await seedWith("C2");
    const response = await request(app)
      .get("/carriers/getProcessing")
      .send(defaultReq);
    expect(Array.isArray(response.body)).toBe(true);
    const data = response.body as Array<ProcessingRow>;
    expect(data.length).toEqual(4);
    data.map((row) => {
      expect(row.payTerms).toEqual("mocked-carrier-terms");
    });
  });

  /**
   * test case C3
   * cases covered by SQL View: carrier_loads_set_2
   */
  it("shows factoringCompany paymentTerms as expected", async () => {
    await seedWith("C3");
    const response = await request(app)
      .get("/carriers/getProcessing")
      .send(defaultReq);
    expect(Array.isArray(response.body)).toBe(true);
    const data = response.body as Array<ProcessingRow>;
    expect(data.length).toEqual(10);
    data.map((row) => {
      expect(row.payTerms).toEqual("factoring-company-mocked-terms");
    });
  });

  /**
   * test case C4
   */
  it("shows carriers with loads in payment holds", async () => {
    await seedWith("C4");
    const reqbody = Object.assign({}, defaultReq, {
      tab: "holds",
      orderBy: "dueDate"
    });
    const response = await request(app)
      .get("/carriers/getProcessing")
      .send(reqbody);
    expect(Array.isArray(response.body)).toBe(true);
    const data = response.body as Array<HoldRow>;
    expect(data.length).toEqual(20); // 5 loads per hold type
    await DBService.init();
    const holdTypes = await getRepository(PaymentHoldType).find();
    holdTypes.forEach((htype) => {
      const typecount = data.reduce((prevCount, nextRow) => {
        return nextRow.holdType === htype.name ? prevCount + 1 : prevCount;
      }, 0);
      expect(typecount).toBe(5);
    });
    await DBService.close();
  });

  it("gets CSV data", async () => {
    await seedWith("C1"); // reuse C1 seeding

    const response = await request(app)
      .get("/carriers/processingCsv")
      .send(defaultReq);

    console.log(response.text);
    const lines = response.text.split("\n");
    expect(lines[0]).toBe(CSVHEAD);
    expect(lines.length).toBeGreaterThan(2);
  });
});
