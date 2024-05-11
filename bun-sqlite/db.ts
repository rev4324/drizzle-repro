import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "../schema";
import { Database } from "bun:sqlite";

export const rawDb = new Database("./db.sqlite");

export const bunDb = drizzle(rawDb, {
  schema,
  logger: true,
});
