import { createRoute, Outlet, redirect } from "@tanstack/react-router"
import { protectedRoute } from "./ProtectedRoutes"

export const protectedAdminRoute = createRoute({
	getParentRoute: () => protectedRoute,
	id: "protected-admin-layout",
	component: Layout,
	beforeLoad: async ({ context: { user } }) => {
		if (user.role !== "admin") {
			throw redirect({
				to: "/movies",
			})
		}
	},
})

function Layout() {
	return (
		<>
			<Outlet />
		</>
	)
}
