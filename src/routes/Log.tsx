import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const logRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/log",
})

function Page() {
	return <>Logs</>
}
