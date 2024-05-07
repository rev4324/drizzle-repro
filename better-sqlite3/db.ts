import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../schema";

export const rawDb = new Database("./db.sqlite");

export const betterSqlite3Db = drizzle(rawDb, {
  schema,
  logger:
    process.env.NODE_ENV === "development"
      ? {
          logQuery: (query, params) => console.log({ query, params }),
        }
      : undefined,
});
