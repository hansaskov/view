import { sql } from "drizzle-orm";

export const currentTimestamp = () => sql`(current_timestamp)`;
export const currentTimestampMs = () => sql`(unixepoch() * 1000)`;
export const currentTimestampS = () => sql`(unixepoch())`;
