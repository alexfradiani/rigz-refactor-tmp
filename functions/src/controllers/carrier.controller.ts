import { Request, Response, Router } from "express";

import Carrier from "../models/carrier";
import CarrierService from "../services/carrier";
import Load from "../models/load";

export class CarrierController {
  private readonly carrierService: CarrierService;
  constructor() {
    this.carrierService = CarrierService.getInstance();
  }

  routes(router: Router): Router {
    router.get("/getProcessing", (req, res) => this.getProcessing(req, res));
    router.get("/:carrierId", (req, res) => this.getById(req, res));
    router.get("/:carrierId/getLoads", (req, res) => this.getLoads(req, res));
    router.post("", (req, res) => this.createCarrier(req, res));

    return router;
  }

  async getProcessing(_req: Request, res: Response): Promise<Response> {
    const viewData = await this.carrierService.getProcessing();
    return res.json(viewData);
  }

  async getLoads(req: Request, res: Response): Promise<Response<Load[]>> {
    const result = await this.carrierService.getLoads(req.params.carrierId);

    return res.json(result);
  }

  async getById(req: Request, res: Response): Promise<Response<Carrier>> {
    const result = await this.carrierService.getById(req.params.carrierId);

    return res.json(result);
  }

  async createCarrier(req: Request, res: Response): Promise<Response<number>> {
    const carrierRequest = req.body as Carrier;
    const result = await this.carrierService.createCarrier(carrierRequest);

    return res.json(result);
  }
}
