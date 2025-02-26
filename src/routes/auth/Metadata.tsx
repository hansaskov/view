import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootRoutes"

export const metadataRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/metadata",
})

function Page() {
	return <>Metadata</>
}
