import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { env } from "elysia";

export function getSqlitePath() {
	const DATA_PATH = env.DATA_PATH ?? "./data";
	const SQLITE = env.SQLITE ?? "sqlite.db";

	if (SQLITE === ":memory:") {
		return ":memory:";
	}

	mkdirSync(DATA_PATH, { recursive: true });
	const SQLITE_PATH = join(DATA_PATH, SQLITE);

	return `${SQLITE_PATH}`;
}
