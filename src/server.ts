import { Elysia } from "elysia";
import homepage from "./pages/index.html";

export const app = new Elysia()
	.get("/", homepage)
	.get("/favicon.ico", Bun.file("./public/favicon.ico"));
