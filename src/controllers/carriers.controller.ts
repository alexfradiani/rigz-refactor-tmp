import CarrierService, {
  HoldRow,
  ProcessingRow
} from "../services/carrier.service";
import { Request, Response, Router } from "express";

import { ValidMethods } from "../database/entities/paymentmethod.entity";
import { apiError } from "../middlewares/error.middleware";

export class CarriersController {
  private readonly svc: CarrierService;

  constructor() {
    this.svc = CarrierService.getInstance();
  }

  routes(): Router {
    const router = Router();
    router.get("/getProcessing", this.getProcessing.bind(this));
    router.get("/processingCsv", this.getProcessingCSV.bind(this));

    return router;
  }

  async getProcessing(req: Request, res: Response): Promise<Response> {
    try {
      if (!this.svc.validReq(req.body)) {
        return res
          .status(400)
          .json(apiError("carrier:processing", "invalid request body"));
      }

      const {
        tab = ValidMethods.Check,
        page,
        orderBy = "carrierId",
        filters
      } = req.body;

      let rows: ProcessingRow[] | HoldRow[] = [];
      if (tab === "holds") {
        rows = await this.svc.getProcessingHolds(page, filters, orderBy);
      } else {
        rows = await this.svc.getProcessing(tab, page, filters, orderBy);
      }
      return res.json(rows);
    } catch (e) {
      return res
        .status(400)
        .json(apiError("carrier:processing", "could not process"));
    }
  }

  async getProcessingCSV(
    _req: Request,
    res: Response
  ): Promise<void | Response> {
    try {
      const filePath = await this.svc.getProcessingCSV();
      if (!filePath) throw new Error();
      return res.sendFile(filePath);
    } catch (e) {
      console.log(e);
      return res.status(400).json(apiError("carrier:processing-csv", ""));
    }
  }
}
