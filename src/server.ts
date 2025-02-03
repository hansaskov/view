import { Elysia } from "elysia";
import homepage from "./pages/index.html";
import login from "./pages/login.html";

export const app = new Elysia()
	.get("/favicon.ico", Bun.file("./public/favicon.ico"))
	.get("/", homepage)
	.get("/login", login);
