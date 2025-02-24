/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { rootRoute } from "./layout/Layout"
import {
	apiKeysRoute,
	devicesRoute,
	filesRoute,
	homepageRoute,
	logRoute,
	metadataRoute,
	moviesRoute,
	photosRoute,
	postRoute,
	sessionsRoute,
	settingsRoute,
	showsRoute,
	usersRoute,
} from "./routes"

const routeTree = rootRoute.addChildren([
	apiKeysRoute,
	devicesRoute,
	filesRoute,
	homepageRoute,
	logRoute,
	metadataRoute,
	moviesRoute,
	photosRoute,
	postRoute,
	sessionsRoute,
	settingsRoute,
	showsRoute,
	usersRoute,
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

const elem = document.getElementById("root")
const app = (
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
)

if (!elem) {
	throw new Error(
		"Could not find root element. Are you sure it is specified in your html?"
	)
}

// @ts-ignore: Vite-specific HMR API
if (import.meta.hot) {
	// With hot module reloading, `import.meta.hot.data` is persisted.
	// @ts-ignore: Vite-specific HMR API
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	const root = (import.meta.hot.data.root ??= createRoot(elem))
	root.render(app)
} else {
	// The hot module reloading API is not available in production.
	createRoot(elem).render(app)
}
