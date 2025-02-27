import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const filesRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/files",
})

function Page() {
	return <>Files</>
}
