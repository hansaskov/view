import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const showsRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/shows",
})

function Page() {
	return <>Shows</>
}
