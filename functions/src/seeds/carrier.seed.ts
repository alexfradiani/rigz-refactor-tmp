import { CLIMethod } from "./cli";

export default class CarrierSeed implements CLIMethod {
  one(): void {
    console.log("creating one carrier seed");
  }
}
