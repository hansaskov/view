import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const devicesRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/devices",
})

function Page() {
	return <>Devices</>
}
