import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const settingsRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/settings",
})

function Page() {
	return <>Settings</>
}
