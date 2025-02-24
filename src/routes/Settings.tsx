import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const settingsRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/settings",
})

function Page() {
	return <>Settings</>
}
