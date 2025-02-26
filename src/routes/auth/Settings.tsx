import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const settingsRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/settings",
})

function Page() {
	return <>Settings</>
}
