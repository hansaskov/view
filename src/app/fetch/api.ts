import { treaty } from "@elysiajs/eden"
import type { App } from "../../server"
import { cache } from "react"

export const api = treaty<App>("localhost:3000").api

export const fetchPosts = cache(() => api.names.get())
