import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"
import { api } from "../utils/eden"
import { cache, Suspense, use } from "react"

export const postRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/posts/$postId",
})

const fetchNames = cache(() => api.names.get())

function Names({
	namesPromise,
}: { namesPromise: ReturnType<typeof fetchNames> }) {
	const { data, error } = use(namesPromise)

	if (error) return <>error</>

	return (
		<ul>
			{data.map(name => (
				<li key={name}>{name}</li>
			))}
		</ul>
	)
}

function Page() {
	const { postId } = postRoute.useParams()

	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">Post {postId}</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<Names namesPromise={fetchNames()} />
			</Suspense>
		</div>
	)
}
