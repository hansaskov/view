import { protectedOrganizationAdminRoute } from "@/layout/ProtectedOrganizationAdminRoutes"
import { createRoute } from "@tanstack/react-router"

export const orgSettingsRoute = createRoute({
	getParentRoute: () => protectedOrganizationAdminRoute,
	component: Page,
	path: "/settings",
})

function Page() {
	return <>Org settings</>
}
