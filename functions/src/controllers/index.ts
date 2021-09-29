const express = require('express');


import { CarrierController } from './carrier.controller';

export const controllers = [ CarrierController ];

export const routes = () => {
  const app = express();

  const carrierCtrl = new CarrierController();
  app.use('/carriers', carrierCtrl.routes);
}