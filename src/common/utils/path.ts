import { mkdirSync } from "node:fs"
import { join } from "node:path"

export function getSqlitePath({
	dataPath,
	sqlite,
}: { dataPath: string; sqlite: string }) {
	if (sqlite === ":memory:") {
		return ":memory:"
	}

	mkdirSync(dataPath, { recursive: true })
	const SQLITE_PATH = join(dataPath, sqlite)

	return `${SQLITE_PATH}`
}
