import account from "@/collections/account"
import session from "@/collections/session"
import user from "@/collections/user"
import verification from "@/collections/verification"
import { db } from "@/db/drizzle"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { anonymous } from "better-auth/plugins"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			account: account.table,
			session: session.table,
			user: user.table,
			verification: verification.table,
		},
	}),
	plugins: [anonymous()],
})
	