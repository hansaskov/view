import { file } from "bun"
import Elysia from "elysia"
import manifest from "@/../public/manifest.json"

// Static routes
export const publicApi = new Elysia({ prefix: "/public" })
	.get("/manifest.json", manifest)
	.get("/icon-160x160.png", file("public/icon-160x160.png"))
	.get("/service-worker.js", file("public/service-worker.js"))
