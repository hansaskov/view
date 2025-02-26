import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const usersRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/users",
})

function Page() {
	return <>Users</>
}
