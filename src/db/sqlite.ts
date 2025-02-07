import { Database } from "bun:sqlite"
import { getSqlitePath } from "../config/enviroment"
import { logger } from "../utils/logger"

const SQLITE_PATH = getSqlitePath()

export const sqlite = new Database(SQLITE_PATH)

logger.info(`🗂️  Running sqlite at ${SQLITE_PATH}`)
