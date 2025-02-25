import { nonAuthRoute } from "@/layout/NonAuthLayout"
import { createRoute } from "@tanstack/react-router"

export const docsRoute = createRoute({
	getParentRoute: () => nonAuthRoute,
	component: Page,
	path: "/docs",
})

function Page() {
	return (
		<>
			Welcome to the documentation page! Unfortunately. It is empty and a work
			in progress
		</>
	)
}
