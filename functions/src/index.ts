import * as functions from "firebase-functions";
import { app }  from './app';
// import CarrierService from "./services/carrier";

// export const getLoadsByCarrierId = functions.https.onRequest(async (req,res) => {
//   const carrierSvc = new CarrierService();
//   const loads = await carrierSvc.getLoads("XBu7gNABc1MEJKdACtzC");
//   console.log(loads);
//   res.json({
//     result: loads
//   })
// });

exports.app = functions.https.onRequest(app);