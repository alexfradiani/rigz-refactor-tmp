import { Request, Response, Router } from "express";

import CarrierService from "../services/carrier.service";
import { apiError } from "../middlewares/error.middleware";

export class CarriersController {
  private readonly svc: CarrierService;

  constructor() {
    this.svc = CarrierService.getInstance();
  }

  routes(): Router {
    const router = Router();
    router.get("/getProcessing", this.getProcessing.bind(this));

    return router;
  }

  async getProcessing(req: Request, res: Response): Promise<Response> {
    try {
      const { page, orderBy = "carrierId", filters } = req.body;
      const rows = await this.svc.getProcessing(page, filters, orderBy);
      return res.json(rows);
    } catch (e) {
      return res.status(400).json(apiError("carrier:processing", ""));
    }
  }
}
