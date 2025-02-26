import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const logRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/log",
})

function Page() {
	return <>Logs</>
}
