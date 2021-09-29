import { Request, Response, Router } from 'express';
import Load from '../models/load';
import CarrierService from '../services/carrier';

export class CarrierController {
  private readonly carrierService: CarrierService;
  constructor() {
    this.carrierService = CarrierService.getInstance()
  };

  routes(router: Router) {
    router.get('/getLoads', (req, res) => this.getLoads2(req,res));

    return router;
  }

  async getLoads2(req: Request, res: Response): Promise<Response<Load[]>> {
    try {
      const carrierId = req.query.carrierId as string;
      const result = await this.carrierService.getLoads(carrierId);
      return res.json(result);  
    } catch (error) {
      throw new Error('Error trying to getLoads');
    }
  }
}
