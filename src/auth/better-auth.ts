import type { Session } from "$collections/session";
import type { User } from "$collections/users";
import { db } from "$db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reddit } from "better-auth/social-providers";
import { resolve } from "bun";
import Elysia, { error, redirect } from "elysia";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true,
	},
});

// user middleware (compute user and session and pass to routes)
const userMiddleware = async (request: Request) => {
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		return {
			user: null,
			session: null,
		};
	}

	return {
		user: session.user,
		session: session.session,
	};
};

export const authMiddleware = new Elysia()
	.derive(({ request }) => userMiddleware(request))
	.as("plugin");

export const authMiddleware2 = new Elysia()
	.derive(({ request }) => userMiddleware(request))
	.macro({
		user: (enable: boolean) => ({
			beforeHandle: async ({ user, session }) => {
				if (enable && (!user || !session)) {
					return error("Unauthorized");
				}
			},
			resolve: async ({ user, session }) => {
				if (enable === false) {
					return;
				}

				user = user as User;
				session = session as Session;

				return { user, session };
			},
		}),
	})
	.as("plugin");

export const authRoutes = new Elysia({ prefix: "/api/auth/*" })
	.post("/", auth.handler)
	.get("/", auth.handler)
	.use(authMiddleware2)
	.get("/", ({ user }) => "", {
		user: false,
	});
