import { db } from "$db/drizzle";
import { session } from "./table";
import type { Insert } from "./types";

export async function create(values: Insert) {
	return db
		.insert(session)
		.values(values)
		.returning()
		.then(v => v[0] as Insert);
}
