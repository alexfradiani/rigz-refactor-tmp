import FactoringCompany from "./factoringcompany";
import Load from "./load";
/**
 * Main model to represent carriers data
 */
export default class Carrier {
  id: string;
  displayId: string;
  name: string;
  paymentTerms: string;
  factoringCompanyId: string;

  // associations used by services, need to be populated separately
  loads: Load[];
  factoringCompany?: FactoringCompany;

  constructor(
    id: string,
    displayId: string,
    name: string,
    paymentTerms: string,
    factoringCompanyId: string
  ) {
    this.id = id;
    this.displayId = displayId;
    this.name = name;
    this.paymentTerms = paymentTerms;
    this.factoringCompanyId = factoringCompanyId;

    this.loads = [];
  }
}

export const carrierConvert = () => ({
  toFirestore: (data: Carrier) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = snap.data();
    const carrier = new Carrier(
      snap.id,
      data.displayId,
      data.name,
      data.paymentTerms,
      data.factoringCompanyId
    );
    return carrier;
  }
});

export const carrierCollection = "carriers";
