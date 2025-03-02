import { Outlet, createRoute, redirect } from "@tanstack/react-router"
import { protectedRoute } from "./ProtectedRoutes"

export const protectedOrganizationRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "organization",
	component: Layout,
	beforeLoad: async ({ context: { user } }) => {
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
