import CarrierService from "./services/carrier";

// const testQuery = async () => {
//   const db = admin.firestore();
//   const test = await db
//     .collection("carriers")
//     .where("accountno", "==", "123564564684")
//     .get();
//   test.forEach((doc: FirebaseFirestore.DocumentData) => {
//     console.log(doc.id, " => ", doc.data().accountno);
//   });
// };

// const usingService = async () => {
//   const carrierSvc = new CarrierService();
//   const carrier = await carrierSvc.getById("XBu7gNABc1MEJKdACtzC");
//   console.log(carrier);
// };
// usingService();

const getCarrierLoads = async () => {
  const carrierSvc = new CarrierService();
  const loads = await carrierSvc.getLoads("XBu7gNABc1MEJKdACtzC");
  console.log(loads);
};
getCarrierLoads();
