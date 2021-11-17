#!/usr/bin/env node

import * as yargs from "yargs";

import CarrierSeed from "./entities/carrier.seed";
import CollectionBoardSeed from "./entities/collectionboard.seed";
import DBService from "../../services/db.service";
import DefaultSeed from "./cases/default.seed";
import FactoringCompanySeed from "./entities/factoringcompany.seed";
import FinancialTransactionSeed from "./entities/financialtransaction.seed";
import LoadSeed from "./entities/load.seed";
import ProcessingPageSeed from "./cases/processingpage.seed";
import UserSeed from "./entities/user.seed";

const seedClasses = {
  DefaultSeed,
  ProcessingPageSeed,
  CarrierSeed,
  FactoringCompanySeed,
  LoadSeed,
  FinancialTransactionSeed,
  UserSeed,
  CollectionBoardSeed
};

interface Arguments {
  seeder: string;
}

const argv: Arguments = yargs.options({
  seeder: {
    alias: "s",
    description: "seeder to use",
    type: "string"
  }
}).argv as Arguments;

const setupSeeder = async () => {
  let seederName = argv.seeder;
  seederName = seederName.charAt(0).toUpperCase() + seederName.slice(1);
  const className = (seederName + "Seed") as keyof typeof seedClasses;

  await DBService.init();
  const seeder = new seedClasses[className]();
  try {
    await seeder.default();
  } catch (error) {
    console.log(
      "Could not run the requested seeder. \nError: ",
      error,
      "\narguments: ",
      argv
    );
  }
  await DBService.close();
};

setupSeeder();
