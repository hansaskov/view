import { db } from "$db/drizzle";
import { users } from "./table";
import type { Insert, Select } from "./types";

export async function create(values: Insert) {
	return db
		.insert(users)
		.values(values)
		.returning()
		.then(v => v[0] as Select);
}
