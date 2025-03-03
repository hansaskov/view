import { Outlet, createRoute, redirect } from "@tanstack/react-router"
import { protectedOrganizationRoute } from "./ProtectedOrganizationRoutes"

export const protectedOrganizationAdminRoute = createRoute({
	getParentRoute: () => protectedOrganizationRoute,
	id: "protected-organization-admin-layout",
	component: Layout,
	beforeLoad: async ({ context }) => {
		/* TODO! */
	},
})

function Layout() {
	return (
		<>
			<Outlet />
		</>
	)
}
