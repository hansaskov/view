import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"
import Posts from "../components/Posts"
import { fetchPosts } from "../fetch/api"
import { rootRoute } from "../layout/Layout"

const qOptions = queryOptions({
	queryKey: ["posts"],
	queryFn: () => fetchPosts(),
})

export const postRoute = createRoute({
	path: "/posts/$postId",
	loader: ({ context }) => context.queryClient.ensureQueryData(qOptions),
	getParentRoute: () => rootRoute,
	component: Page,
})

function Page() {
	const { postId } = postRoute.useParams()
	const { data } = useSuspenseQuery(qOptions)

	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">Post {postId}</h2>
			<Posts props={data} />
		</div>
	)
}
