#!/usr/bin/env node

import * as yargs from "yargs";

import CarrierSeed from "./entities/carrier.seed";
import CollectionBoardSeed from "./entities/collectionboard.seed";
import { DB } from "../../config";
import FactoringCompanySeed from "./entities/factoringcompany.seed";
import FinancialTransactionSeed from "./entities/financialtransaction.seed";
import LoadSeed from "./entities/load.seed";
import ProcessingPageSeed from "./cases/processingpage.seed";
import UserSeed from "./entities/user.seed";
import { createConnection } from "typeorm";

const seedClasses = {
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
  method: string;
}

export interface CLIMethod<T> {
  one?: () => Promise<T> | Promise<void>;
  many?: (max?: number) => Promise<T[]> | Promise<void>;
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

const setupSeeder = async () => {
  let seederName = argv.seeder;
  seederName = seederName.charAt(0).toUpperCase() + seederName.slice(1);
  const className = (seederName + "Seed") as keyof typeof seedClasses;
  const db = await createConnection(DB);
  const seeder = new seedClasses[className](db);
  const methodName = argv.method as keyof CLIMethod<typeof seeder>;
  try {
    await seeder[methodName]();
  } catch (error) {
    console.log(
      "Could not run the requested seeder and method. \nError: ",
      error,
      "\narguments: ",
      argv
    );
  }
  await db.close();
};

setupSeeder();
