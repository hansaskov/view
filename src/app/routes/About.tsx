import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/about",
})

function Page() {
	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">About Us</h2>
			<p className="text-gray-600">Learn more about our company.</p>
		</div>
	)
}
