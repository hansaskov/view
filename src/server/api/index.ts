import { logger } from "@common/utils/logger"
import Elysia from "elysia"
import { publicApi } from "./public"

export const api = new Elysia({ prefix: "/api" })
	.onBeforeHandle(({ path }) => logger.info(path))
	.use(publicApi)
