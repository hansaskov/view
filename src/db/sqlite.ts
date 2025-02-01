import { Database } from "bun:sqlite";
import { env } from "elysia";

const SQLITE = env.SQLITE ?? "sqlite.db";

console.log(`Running sqlite as ${SQLITE}`)

export const sqlite = new Database(SQLITE);
