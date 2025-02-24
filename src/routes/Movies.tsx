import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const moviesRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/movies",
})

function Page() {
	return <>Movies</>
}
