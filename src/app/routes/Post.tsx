import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"
import { type } from "arktype"
import { Suspense } from "react"
import Posts from "../components/Posts"
import { fetchPosts } from "../fetch/api"
import { rootRoute } from "../layout/Layout"

const postsQueryOptions = queryOptions({
	queryKey: ["posts"],
	queryFn: () => fetchPosts(),
})

export const postRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/posts/$postId",
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
	component: Page,
})

function Page() {
	const { postId } = postRoute.useParams()
	const { data } = useSuspenseQuery(postsQueryOptions)

	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">Post {postId}</h2>
			<Posts props={data} />
		</div>
	)
}
