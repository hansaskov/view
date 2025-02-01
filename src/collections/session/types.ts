import type { session } from "./table";

export type Select = typeof session.$inferSelect;
export type Insert = typeof session.$inferInsert;
