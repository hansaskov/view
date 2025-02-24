import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const sessionsRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/sessions",
})

function Page() {
	return <>Sessions</>
}
