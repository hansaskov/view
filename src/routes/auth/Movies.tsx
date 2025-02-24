import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const moviesRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/movies",
})

function Page() {
	return <>Movies</>
}
