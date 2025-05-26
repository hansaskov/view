import { Database } from "bun:sqlite"
import { environment } from "@common/utils/environment"
import { logger } from "@common/utils/logger"
import { getSqlitePath } from "@common/utils/path"

const SQLITE_PATH = getSqlitePath({
	dataPath: environment.DATA_PATH,
	sqlite: environment.SQLITE,
})

export const sqlite = new Database(SQLITE_PATH)

logger.info(`🗂️  Running sqlite at ${SQLITE_PATH}`)
