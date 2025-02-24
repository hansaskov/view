import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const logRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/log",
})

function Page() {
	return <>Logs</>
}
