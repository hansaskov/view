
import { Database } from "bun:sqlite";
import { getSqlitePath } from "../config/enviroment";

const SQLITE_PATH = getSqlitePath()

console.log(`🗂️  Running sqlite at ${SQLITE_PATH}`);

export const sqlite = new Database(SQLITE_PATH);
