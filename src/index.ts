import { environment } from "./common/utils/environment.ts"
import { logger } from "./common/utils/logger.ts"
import { server } from "./server.ts"
const signals = ["SIGINT", "SIGTERM"]

for (const signal of signals) {
	process.on(signal, async () => {
		logger.info(`Received ${signal}. Initiating graceful shutdown...`)
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

server.listen(environment.PORT, () =>
	logger.info(`🚀 Server started at ${environment.BETTER_AUTH_URL}`)
)
