import { env } from "elysia"
import { app } from "./server.ts"
import { logger } from "./utils/logger.ts"
const signals = ["SIGINT", "SIGTERM"]

for (const signal of signals) {
	process.on(signal, async () => {
		console.log(`Received ${signal}. Initiating graceful shutdown...`)
		await app.stop()
		process.exit(0)
	})
}

process.on("uncaughtException", error => {
	console.error(error)
})

process.on("unhandledRejection", error => {
	console.error(error)
})

app.listen(env.PORT ?? 3000, () =>
	logger.info(`🚀 Server started at ${app.server?.url.origin}`),
)
