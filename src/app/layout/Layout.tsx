import type { QueryClient } from "@tanstack/react-query"
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const rootRoute = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		)
	},
})

function RootComponent() {
	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-4xl mx-auto px-4 py-3 flex gap-4">
					<Link
						to="/"
						className="text-gray-600 hover:text-gray-900 [&.active]:font-bold [&.active]:text-blue-600"
						preload="intent"
					>
						Home
					</Link>
					<Link
						to="/about"
						className="text-gray-600 hover:text-gray-900 [&.active]:font-bold [&.active]:text-blue-600"
						preload="intent"
					>
						About
					</Link>
					<Link
						to="/posts/$postId"
						params={{ postId: "123" }}
						className="text-gray-600 hover:text-gray-900 [&.active]:font-bold [&.active]:text-blue-600"
						preload="intent"
					>
						Example Post
					</Link>
				</div>
			</nav>

			<main className="max-w-4xl mx-auto px-4 py-6">
				<Outlet />
			</main>

			<TanStackRouterDevtools />
		</div>
	)
}
