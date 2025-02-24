import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const filesRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/files",
})

function Page() {
	return <>Files</>
}
