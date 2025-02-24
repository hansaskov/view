import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const apiKeysRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/api-keys",
})

function Page() {
	return <>API Keys</>
}
