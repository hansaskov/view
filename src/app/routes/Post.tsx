import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const postRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/posts/$postId",
})

function Page() {
	const { postId } = postRoute.useParams()
	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">Post {postId}</h2>
			<p className="text-gray-600">Content for post {postId}</p>
		</div>
	)
}
