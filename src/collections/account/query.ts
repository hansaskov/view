import { db } from "$db/drizzle";
import { table } from "./table";
import type { Insert } from "./types";

export async function create(values: Insert) {
	return db
		.insert(table)
		.values(values)
		.returning()
		.then(v => v[0] as Insert);
}
