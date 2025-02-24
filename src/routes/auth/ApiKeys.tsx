import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"

export const apiKeysRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/api-keys",
})

function Page() {
	return <>API Keys</>
}
