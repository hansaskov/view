import type { App } from "../../server";
import { treaty } from "@elysiajs/eden";

export const api = treaty<App>("http://127.0.0.1:3000").api;

export const fetchPosts = api.names.get;
