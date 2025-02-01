
import { Database } from "bun:sqlite";
import { env } from "elysia";
import { join } from "node:path"

const DATA_PATH = env.DATA_PATH ?? "./data";
const SQLITE = env.SQLITE ?? "sqlite.db";

const SQLITE_PATH = SQLITE === ":memory:" ? ":memory:" : join(DATA_PATH, SQLITE);

console.log(`Running sqlite as ${SQLITE_PATH}`);
export const sqlite = new Database(SQLITE_PATH);
