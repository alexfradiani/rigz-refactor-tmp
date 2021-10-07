#!/usr/bin/env node

import * as yargs from "yargs";
import ProcessingPageSeed from "./useCases/processingPage.seed";

const seedClasses = {
  ProcessingPageSeed
};

interface Arguments {
  seeder: string;
  method: string;
}

export interface CLIMethod {
  one: () => Promise<string>;
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
