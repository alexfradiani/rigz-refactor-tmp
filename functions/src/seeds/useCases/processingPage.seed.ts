import { CLIMethod } from "../cli";
import LoadSeed from "../entities/load.seed";

export default class ProcessingPageSeed implements CLIMethod {
  async one(): Promise<string> {
    try {
      const amountOfCarriers = 4;
      const amountOfLoads = 1;

      await new LoadSeed().manyToProcessingPage(
        amountOfLoads,
        amountOfCarriers
      );

      return "seed completed!";
    } catch (error) {
      console.log(error, "LoadSeed insert one fails");
      throw error;
    }
  }
}
