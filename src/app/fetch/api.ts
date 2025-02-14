import { treaty } from "@elysiajs/eden"
import type { App } from "../../server"

export const api = treaty<App>("localhost:3000").api

export const fetchPosts = api.names.get
