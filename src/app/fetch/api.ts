import { treaty } from "@elysiajs/eden"
import type { App } from "../../server"

export const api = treaty<App>("http://127.0.0.1:3000/").api

export const fetchPosts = api.names.get
