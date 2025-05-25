import { type } from "arktype"
import { env } from "bun"
import { logger } from "./logger"

// Define environment variable requirements
const environmentSchema = type({
	PORT: "string.digits = '3000'",
	DATA_PATH: "string = './data'",
	SQLITE: "string = 'sqlite.db'",
	BETTER_AUTH_SECRET: "string > 0",
	BETTER_AUTH_URL: "string > 0",
	GITHUB_CLIENT_ID: "string > 0",
	GITHUB_CLIENT_SECRET: "string > 0",
	GOOGLE_CLIENT_ID: "string > 0",
	GOOGLE_CLIENT_SECRET: "string > 0",
	MICROSOFT_CLIENT_ID: "string > 0",
	MICROSOFT_CLIENT_SECRET: "string > 0",
})

// Validate environment variables
logger.info("🔧 Parsing environment variables")
const result = environmentSchema(env) // If you are seeing a runtime error here, then please see this issue with a potential fix: https://github.com/arktypeio/arktype/issues/1330

// Exit if validation fails
if (result instanceof type.errors) {
	logger.error(result.summary)
	logger.error("process exited with error code 1")
	process.exit(1)
}

// Export validated environment
const environment = result
export { environment }
