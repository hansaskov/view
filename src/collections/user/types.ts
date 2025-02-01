import type { users } from "./table";

export type Select = typeof users.$inferSelect;
export type Insert = typeof users.$inferInsert;
