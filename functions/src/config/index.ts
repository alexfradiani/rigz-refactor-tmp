import { config } from "dotenv";
config({ path: `.env.${process.env.ENV || "dev"}` });

// exit process if .env wasn't provided
if (!process.env.ENV) {
  console.error("==> Please check your .env");
  process.exit(1);
}

export const PRODUCTION_ENV = process.env.ENV === "production";
export const DEV_ENV = process.env.ENV === "dev";
export const TESTING_ENV = process.env.ENV === "test";
export const USE_FIRESTORE_EMULATOR = process.env.FSTORE_EMULATOR == "true";

export const { ENV, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX_REQUESTS } = process.env;
