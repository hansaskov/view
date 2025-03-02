import { protectedOrganizationRoute } from "@/layout/ProtectedOrganizationRoutes"
import { createRoute } from "@tanstack/react-router"

export const orgSharingRoute = createRoute({
	getParentRoute: () => protectedOrganizationRoute,
	component: Page,
	path: "/sharing",
})

function Page() {
	return <>Sharing</>
}
