import { protectedOrganizationAdminRoute } from "@/layout/ProtectedOrganizationAdminRoutes"
import { createRoute } from "@tanstack/react-router"

export const orgUsersRoute = createRoute({
	getParentRoute: () => protectedOrganizationAdminRoute,
	component: Page,
	path: "/users",
})

function Page() {
	return <>Org users</>
}
