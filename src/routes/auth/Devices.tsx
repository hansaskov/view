import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const devicesRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/devices",
})

function Page() {
	return <>Devices</>
}
