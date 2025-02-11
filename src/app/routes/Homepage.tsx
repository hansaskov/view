import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const homepageRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/",
})

function Page() {
	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">Home Page</h2>
			<p className="text-gray-600">Welcome to our website!</p>
		</div>
	)
}
