import { Outlet, createRoute } from "@tanstack/react-router"
import { rootRoute } from "./RootLayout"

export const nonAuthRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "non-auth-layout",
	component: Layout,
})

function Layout() {
	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	)
}
