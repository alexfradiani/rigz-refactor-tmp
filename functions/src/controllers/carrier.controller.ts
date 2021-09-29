import express from 'express';
import Load from '../models/load';
import CarrierService from '../services/carrier';

export class CarrierController {
  private readonly carrierService: CarrierService;
  constructor() {
    this.carrierService = CarrierService.getInstance()
  };

  public routes() {
    const router = express.Router();
    router.get('/getLoads', (req, res) => {
      const carrierId = req.query.carrierId as string;
      res.json(this.getLoads(carrierId));
    });
  }

  async getLoads(carrierId: string): Promise<Load[]> {
    console.log(`Estamos aqui ${carrierId}`);
    const result = await this.carrierService.getLoads(carrierId);
    return result;
  }
}
