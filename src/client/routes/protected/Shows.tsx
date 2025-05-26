import { protectedRoute } from "@client/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const showsRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/shows",
})

function Page() {
	return <>Shows</>
}
