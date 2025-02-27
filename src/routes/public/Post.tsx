import { publicRoutes } from "@/layout/PublicRoutes"
import { rootRoute } from "@/layout/RootRoutes"
import { fetchPosts } from "@/lib/api"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"

const qOptions = queryOptions({
	queryKey: ["posts"],
	queryFn: () => fetchPosts(),
})

export const postRoute = createRoute({
	getParentRoute: () => publicRoutes,
	path: "/posts/$postId",
	loader: ({ context }) => context.queryClient.ensureQueryData(qOptions),
	component: Page,
})

function Page() {
	const { postId } = postRoute.useParams()
	const {
		data: { data, error },
	} = useSuspenseQuery(qOptions)

	if (error) return <div>error</div>

	console.log("Printing to the console")
	console.log(data)

	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">Post {postId}</h2>
			<ul>
				{data.map(name => (
					<li key={name}>{name}</li>
				))}
			</ul>
		</div>
	)
}
