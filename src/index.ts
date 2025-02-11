import { env } from "elysia"
import { server } from "./server.ts"
import { logger } from "./utils/logger.ts"
const signals = ["SIGINT", "SIGTERM"]

for (const signal of signals) {
	process.on(signal, async () => {
		console.log(`Received ${signal}. Initiating graceful shutdown...`)
		await server.stop()
		process.exit(0)
	})
}

process.on("uncaughtException", error => {
	console.error(error)
})

process.on("unhandledRejection", error => {
	console.error(error)
})

server.listen(env.PORT ?? 3000, () =>
	logger.info(`🚀 Server started at ${server.server?.url.origin}`)
)
