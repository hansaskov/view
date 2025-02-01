import { randomUUID } from "node:crypto";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const users = sqliteTable('users', {
    id: text().primaryKey().default(randomUUID()),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: integer({ mode: "boolean" }).notNull(),
    image: text(),
    createdAt: integer({ mode: "timestamp" }).notNull().default(new Date),
    updatedAt: integer({ mode: "timestamp" }).notNull().default(new Date).$onUpdate(() => new Date)
  })