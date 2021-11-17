import PaymentHoldType, {
  ValidHoldTypes
} from "../../entities/paymentholdtype.entity";
import PaymentMethod, {
  ValidMethods
} from "../../entities/paymentmethod.entity";

import { getManager } from "typeorm";

/**
 * Default seed
 * populates basic data with constants used by other entities
 */
export default class DefaultSeed {
  async default(): Promise<void> {
    // default payment methods
    for (const name in ValidMethods) {
      const pm = new PaymentMethod();
      pm.name = name;
      await getManager().save(pm);
    }

    // default payment-hold types
    for (const name in ValidHoldTypes) {
      const holdType = new PaymentHoldType();
      holdType.name = name;
      await getManager().save(holdType);
    }
  }
}
