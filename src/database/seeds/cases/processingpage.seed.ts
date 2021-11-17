import PaymentMethod, {
  ValidMethods
} from "../../entities/paymentmethod.entity";
import { getManager, getRepository } from "typeorm";

import Carrier from "../../entities/carrier.entity";
import CarrierSeed from "../entities/carrier.seed";
import CollectionBoardSeed from "../entities/collectionboard.seed";
import FactoringCompanySeed from "../entities/factoringcompany.seed";
import FinancialTransactionSeed from "../entities/financialtransaction.seed";
import Load from "../../entities/load.entity";
import LoadSeed from "../entities/load.seed";
import PaymentHold from "../../entities/paymenthold.entity";
import PaymentHoldService from "../../../services/paymenthold.service";
import PaymentMethodService from "../../../services/paymentmethod.service";
import UserSeed from "../entities/user.seed";
import { ValidHoldTypes } from "../../entities/paymentholdtype.entity";

export default class ProcessingPageSeed {
  async default(): Promise<void> {
    const carriersCount = 100;
    const loadsCount = 3;
    const ftCount = 2;

    const carrierSeed = new CarrierSeed();
    const carriers = await carrierSeed.with({}, carriersCount);
    console.log("carriers created");

    const userSeed = new UserSeed();
    const users = await userSeed.with({}, carriersCount);
    console.log("users created");

    const loadSeed = new LoadSeed();
    let loads: Load[] = [];
    for (let i = 0; i < carriersCount; i++) {
      const newLoads = await loadSeed.with(
        { carrier: carriers[i] },
        loadsCount
      );
      users[i].processingCarrier = carriers[i]; // carrier-processing user
      await getManager().save(users[i]);

      loads = loads.concat(newLoads);
    }
    console.log("loads created");

    const ftSeed = new FinancialTransactionSeed();
    for (let i = 0; i < loads.length; i++) {
      await ftSeed.with({ load: loads[i] }, ftCount);
    }
    console.log("financial transactions created");

    const cbSeed = new CollectionBoardSeed();
    for (let i = 0; i < carriersCount; i++) {
      await cbSeed.with({ carrier: carriers[i] });
    }
    console.log("collection boards created");
  }

  /**
   * Seeder for test case C1
   */
  async caseC1(): Promise<void> {
    // numbers of carriers to create per payment method
    const countPerMethod = 5;

    const carrierSeed = new CarrierSeed();
    const loadSeed = new LoadSeed();
    const ftSeed = new FinancialTransactionSeed();
    const pmRepo = getRepository(PaymentMethod);
    for (const name in ValidMethods) {
      const pm = (await pmRepo.findOne({ name })) as PaymentMethod;
      for (let i = 0; i < countPerMethod; i++) {
        const carrier = (await carrierSeed.with({ paymentMethod: pm }))[0];
        const load = (await loadSeed.with({ carrier }))[0];
        await ftSeed.with({ load });
      }
    }
  }

  /**
   * seeder for test case C2
   */
  async caseC2(): Promise<void> {
    const pmSvc = new PaymentMethodService();
    const loadSeed = new LoadSeed();
    const carrierSeed = new CarrierSeed();
    let loads: Load[] = [];

    const createCarrier = async () => {
      return await carrierSeed.one({
        paymentTerms: terms,
        paymentMethod: await pmSvc.getFor(ValidMethods.Check)
      });
    };

    // create some loads with FC and doNotPayFactoring set to true
    const terms = "mocked-carrier-terms";
    const fc = await new FactoringCompanySeed().one();
    let carrier: Carrier;
    for (let i = 0; i < 3; i++) {
      carrier = await createCarrier();
      const load = await loadSeed.one({
        carrier,
        factoringCompany: fc,
        doNotPayFactoring: true
      });
      loads.push(load);
    }

    // create some loads without factoring company (default)
    carrier = await createCarrier();
    const nLoads = await loadSeed.with({ carrier });
    loads = loads.concat(nLoads);

    // add some transactions
    await this.addTransactionsToLoads(loads);
  }

  /**
   * seeder for test case C3
   */
  async caseC3(): Promise<void> {
    const loadSeed = new LoadSeed();
    const carrierSeed = new CarrierSeed();
    const pmSvc = new PaymentMethodService();
    // create some loads with factoring company and doNotPayFactoring FALSE
    const factoringCompany = await new FactoringCompanySeed().one({
      paymentTerms: "factoring-company-mocked-terms",
      paymentMethod: await pmSvc.getFor(ValidMethods.Check)
    });
    const doNotPayFactoring = false;
    const loads: Load[] = [];
    for (let i = 0; i < 10; i++) {
      const carrier = await carrierSeed.one({
        factoringCompany
      });
      const load = await loadSeed.one({
        carrier,
        factoringCompany,
        doNotPayFactoring
      });
      loads.push(load);
    }

    // add some transactions
    await this.addTransactionsToLoads(loads);
  }

  async caseC4(): Promise<void> {
    const loadSeeder = new LoadSeed();
    const ftSeeder = new FinancialTransactionSeed();
    const paymentHoldService = new PaymentHoldService();
    // create some loads for each type of payment hold
    for (const htype in ValidHoldTypes) {
      const loads = await loadSeeder.with({}, 5);
      for (let i = 0; i < loads.length; i++) {
        await ftSeeder.with({ load: loads[i] }, 5); // add some transactions
        const ph = new PaymentHold();
        ph.load = loads[i];
        ph.paymentHoldType = await paymentHoldService.getHoldTypeFor(htype);
        await getManager().save(ph);
      }
    }
  }

  // helper for seeding methods
  async addTransactionsToLoads(loads: Load[]): Promise<void> {
    const ftSeed = new FinancialTransactionSeed();
    for (let i = 0; i < loads.length; i++) {
      await ftSeed.with({ load: loads[i] }, 5);
    }
  }
}
