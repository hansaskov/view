import { protectedRoute } from "@client/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"

export const photosRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/photos",
})

function Page() {
	return <>Photos</>
}
