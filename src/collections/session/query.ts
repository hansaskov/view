import { db } from "$db/drizzle";
import { table } from "./table";
import type { Insert, Select } from "./types";

async function insertMany(values: Insert[]) {
	return db.insert(table).values(values).returning();
}

async function insertOne(values: Insert) {
	return db
		.insert(table)
		.values(values)
		.returning()
		.then(v => v[0]);
}

export async function insert(values: Insert): Promise<Select>;
export async function insert(values: Insert[]): Promise<Select[]>;
export async function insert(values: Insert | Insert[]) {
	return Array.isArray(values) ? insertMany(values) : insertOne(values);
}

export async function selectAll() {
	return await db.select().from(table);
}
