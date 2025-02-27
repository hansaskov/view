import { protectedAdminRoute } from "@/layout/ProtectedAdminRoutes"
import { createRoute } from "@tanstack/react-router"

export const metadataRoute = createRoute({
	getParentRoute: () => protectedAdminRoute,
	component: Page,
	path: "/metadata",
})

function Page() {
	return <>Metadata</>
}
