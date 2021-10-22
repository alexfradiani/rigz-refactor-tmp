import { DB } from "../config";

export = {
  type: DB.type,
  host: DB.host,
  port: DB.port,
  username: DB.username,
  password: DB.password,
  database: DB.database,
  entities: DB.entities,
  migrations: DB.migrations,
  cli: DB.cli,
  synchronize: DB.synchronize
};
