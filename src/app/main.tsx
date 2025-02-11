// src/routes/index.tsx
import { createRouter } from "@tanstack/react-router"
import { rootRoute } from "./layout/Layout"
import { aboutRoute } from "./routes/About"
import { postRoute } from "./routes/Post"
import { homepageRoute } from "./routes/Homepage"

// 3. Build Simplified Route Tree
const routeTree = rootRoute.addChildren([homepageRoute, aboutRoute, postRoute])

// 4. Create Router Instance
export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
