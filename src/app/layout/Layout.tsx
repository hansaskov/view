import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

// 1. Create Root Route with Navigation
export const rootRoute = createRootRoute({
	component: Layout,
})

function Layout() {
	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-4xl mx-auto px-4 py-3 flex gap-4">
					<Link
						to="/"
						className="text-gray-600 hover:text-gray-900 [&.active]:font-bold [&.active]:text-blue-600"
					>
						Home
					</Link>
					<Link
						to="/about"
						className="text-gray-600 hover:text-gray-900 [&.active]:font-bold [&.active]:text-blue-600"
					>
						About
					</Link>
					<Link
						to="/posts/$postId"
						params={{ postId: "123" }}
						className="text-gray-600 hover:text-gray-900 [&.active]:font-bold [&.active]:text-blue-600"
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
