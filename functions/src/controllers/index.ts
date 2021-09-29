import { Request, Response, Router } from 'express';
import { CarrierController } from './carrier.controller';


export const routes = (router: Router) => {
  router.get('/test', (req: Request, res: Response) => {
    res.json(`complete ${req.path}`);
  });

  const carrierCtrl = new CarrierController();
  router.use('/carriers', carrierCtrl.routes(router));
  
  return router;
}
