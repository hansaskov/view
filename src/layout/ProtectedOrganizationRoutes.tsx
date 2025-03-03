import { authClient } from "@/lib/auth-client"
import { queryOptions } from "@tanstack/react-query"
import { Outlet, createRoute, redirect } from "@tanstack/react-router"
import { protectedRoute } from "./ProtectedRoutes"

export const protectedOrganizationRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "$slug",
	component: Layout,
	beforeLoad: async ({ context: { user }, params: { slug } }) => {},
})

function Layout() {
	return (
		<>
			<Outlet />
		</>
	)
}
