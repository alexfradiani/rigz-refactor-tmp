import PaymentMethod, {
  ValidMethods
} from "../database/entities/paymentmethod.entity";

import faker from "faker";
import { getRepository } from "typeorm";

export default class PaymentMethodService {
  private static instance: PaymentMethodService;

  public static getInstance(): PaymentMethodService {
    if (!this.instance) {
      this.instance = new PaymentMethodService();
    }

    return this.instance;
  }

  async getFor(methodName: string): Promise<PaymentMethod> {
    const pm = await getRepository(PaymentMethod).findOne({ name: methodName });
    if (!pm) {
      throw new Error("Payment Method was not found.");
    }
    return pm;
  }

  async getRandom(): Promise<PaymentMethod> {
    const methods = [
      ValidMethods.Check,
      ValidMethods.DirectDeposit,
      ValidMethods.FuelCard
    ];
    return await this.getFor(faker.random.arrayElement(methods));
  }
}
