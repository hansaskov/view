import { Elysia } from "elysia";
import { authRoutes } from "./auth/better-auth";
import homepage from "./pages/index.html";
import login from "./pages/login.html";

export const app = new Elysia()
	.use(authRoutes)
	.get("/favicon.ico", Bun.file("./public/favicon.ico"))
	.get("/", homepage)
	.get("/login", login);
