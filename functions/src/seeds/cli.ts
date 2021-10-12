#!/usr/bin/env node

import * as yargs from "yargs";

import CarrierProcessingSeed from "./entities/carrierProcessing.seed";
import CarrierSeed from "./entities/carrier.seed";
import CollectionBoardSeed from "./entities/collectionBoard.seed";
import FactoringCompanySeed from "./entities/factoringCompany.seed";
import FinancialTransactionSeed from "./entities/financialTransaction.seed";
import LoadSeed from "./entities/load.seed";
import ProcessingPageSeed from "./useCases/processingPage.seed";
import UserSeed from "./entities/user.seed";

const seedClasses = {
  ProcessingPageSeed,
  CarrierSeed,
  FactoringCompanySeed,
  LoadSeed,
  FinancialTransactionSeed,
  UserSeed,
  CarrierProcessingSeed,
  CollectionBoardSeed
};

interface Arguments {
  seeder: string;
  method: string;
}

export interface CLIMethod {
  one?: () => Promise<string> | Promise<void>;
  many?: (max?: number) => Promise<string[]> | Promise<void>;
}

const argv: Arguments = yargs.options({
  seeder: {
    alias: "s",
    description: "seeder to use",
    type: "string"
  },
  method: {
    alias: "m",
    description: "method to run",
    type: "string"
  }
}).argv as Arguments;

let seederName = argv.seeder;
seederName = seederName.charAt(0).toUpperCase() + seederName.slice(1);
const className = (seederName + "Seed") as keyof typeof seedClasses;
const seeder = new seedClasses[className]();
const methodName = argv.method as keyof CLIMethod;

try {
  seeder[methodName]();
} catch (error) {
  console.log(
    "Could not run the requested seeder and method. \nError: ",
    error,
    "\narguments: ",
    argv
  );
}
