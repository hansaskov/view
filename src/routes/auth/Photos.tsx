import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const photosRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/photos",
})

function Page() {
	return <>Photos</>
}
