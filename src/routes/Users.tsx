import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const usersRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/users",
})

function Page() {
	return <>Users</>
}
