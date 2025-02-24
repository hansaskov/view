import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const usersRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/users",
})

function Page() {
	return <>Users</>
}
