import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const sessionsRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/sessions",
})

function Page() {
	return <>Sessions</>
}
