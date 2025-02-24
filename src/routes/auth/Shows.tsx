import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const showsRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/shows",
})

function Page() {
	return <>Shows</>
}
