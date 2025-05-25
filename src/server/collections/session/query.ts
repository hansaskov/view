import { db } from "@server/db/drizzle";
import { eq } from "drizzle-orm";
import { table } from "./table";
import type { Insert, Select, Unique } from "./types";

async function insertMany(values: Insert[]) {
  return db.insert(table).values(values).returning();
}

async function insertOne(values: Insert) {
  return db
    .insert(table)
    .values(values)
    .returning()
    .then((v) => v[0] as Select);
}

export async function insert(values: Insert): Promise<Select>;
export async function insert(values: Insert[]): Promise<Select[]>;
export async function insert(values: Insert | Insert[]) {
  return Array.isArray(values) ? insertMany(values) : insertOne(values);
}

export async function selectAll() {
  return await db.select().from(table);
}

export async function selectFirst() {
  return await db
    .select()
    .from(table)
    .limit(1)
    .then((v) => v[0]);
}

export async function remove(values: Unique) {
  return await db.delete(table).where(eq(table.id, values.id));
}
