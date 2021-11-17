import PaymentHoldType from "../database/entities/paymentholdtype.entity";
import { getRepository } from "typeorm";

export default class PaymentHoldService {
  private static instance: PaymentHoldService;

  public static getInstance(): PaymentHoldService {
    if (!this.instance) {
      this.instance = new PaymentHoldService();
    }

    return this.instance;
  }

  async getHoldTypeFor(name: string): Promise<PaymentHoldType> {
    const htype = await getRepository(PaymentHoldType).findOne({ name });
    if (!htype) {
      throw new Error("Payment Hold Type was not found.");
    }
    return htype;
  }
}
