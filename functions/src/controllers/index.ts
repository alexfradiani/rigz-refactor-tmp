import { CarrierController } from "./carrier.controller";
import { Router } from "express";

export const routes = (router: Router): Router => {
  const carrierCtrl = new CarrierController();
  router.use("/carrier", carrierCtrl.routes(router));

  return router;
};
