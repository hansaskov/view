import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const devicesRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/devices",
})

function Page() {
	return <>Devices</>
}
