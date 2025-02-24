import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const filesRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/files",
})

function Page() {
	return <>Files</>
}
