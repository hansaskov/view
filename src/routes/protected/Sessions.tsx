import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const sessionsRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/sessions",
})

function Page() {
	return <>Sessions</>
}
