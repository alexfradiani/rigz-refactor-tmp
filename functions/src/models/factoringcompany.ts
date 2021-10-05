export default class FactoringCompany {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export const factoringCompanyConvert = () => ({
  toFirestore: (data: FactoringCompany) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = snap.data();
    const fc = new FactoringCompany(snap.id, data.name);
    return fc;
  }
});

export const factoringCompaniesCollection = "factoringCompanies";
