import { randomUUID } from "node:crypto";
import { table as users } from "@server/collections/user/table"; // drizzle-kit still does not support esm
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const TABLE_NAME = "session";

export const table = sqliteTable(
  TABLE_NAME,
  {
    id: text().primaryKey().$defaultFn(randomUUID),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text().notNull(),
    expiresAt: integer({ mode: "timestamp" }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    impersonatedBy: text(),
    activeOrganizationId: text(),
    createdAt: integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("idx_session_userId").on(table.userId),
    index("idx_session_token").on(table.token),
    index("idx_session_userId_token").on(table.userId, table.token),
  ],
);
