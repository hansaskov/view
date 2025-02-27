import { protectedAdminRoute } from "@/layout/ProtectedAdminRoutes"
import { createRoute } from "@tanstack/react-router"

export const devicesRoute = createRoute({
	getParentRoute: () => protectedAdminRoute,
	component: Page,
	path: "/devices",
})

function Page() {
	return <>Devices</>
}
