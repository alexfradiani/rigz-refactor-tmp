import { Router } from "express";
import { CarrierController } from "./carrier.controller";


export const routes = (router: Router): Router => {
  const carrierCtrl = new CarrierController();
  router.use("/carriers", carrierCtrl.routes(router));

  return router;
};
