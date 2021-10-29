// eslint-disable-next-line max-len
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
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
export const CI_ENV = process.env.ENV === "ci";
export const USE_FIRESTORE_EMULATOR = process.env.FSTORE_EMULATOR == "true";

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

export const DB: MysqlConnectionOptions = {
  type: "mysql",
  host: process.env.TYPEORM_HOST || "localhost",
  port,
  username: process.env.TYPEORM_USERNAME || "",
  password: process.env.TYPEORM_PASSWORD || "",
  database: process.env.TYPEORM_DATABASE || "",
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
  logging: process.env.TYPEORM_LOGGING === "true",
  entities:
    TESTING_ENV || CI_ENV
      ? ["src/database/entities/**/*.ts"]
      : ["dist/database/entities/**/*.js"],
  migrations:
    TESTING_ENV || CI_ENV
      ? ["src/database/migrations/**/*.ts"]
      : ["dist/database/migrations/**/*.js"],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
  },
  subscribers:
    TESTING_ENV || CI_ENV
      ? ["src/database/subscribers/**/*.ts"]
      : ["dist/database/subscribers/**/*.js"]
};

export const RateLimiterOpts = {
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW || "5") * 60 * 1000,
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
  message: {
    status: 429,
    message: "Too many requests, please try again later."
  }
};

export const { ENV } = process.env;
