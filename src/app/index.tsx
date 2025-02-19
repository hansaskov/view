import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { createRouter } from "@tanstack/react-router"
import React from "react"
import ReactDOM from "react-dom/client"
import { rootRoute } from "./layout/Layout"
import { aboutRoute } from "./routes/About"
import { homepageRoute } from "./routes/Homepage"
import { loginRoute } from "./routes/Login"
import { postRoute } from "./routes/Post"

const routeTree = rootRoute.addChildren([
	homepageRoute,
	aboutRoute,
	postRoute,
	loginRoute,
])
const queryClient = new QueryClient()

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	context: {
		queryClient,
	},
})

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

const rootElement = document.getElementById("root")

if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)

	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>
	)
} else {
	console.error("CRITICAL: COULD NOT FIND ROOT COMPONENT")
}
