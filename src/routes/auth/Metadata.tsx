import { authRoute } from "@/layout/AuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const metadataRoute = createRoute({
	getParentRoute: () => authRoute,
	component: Page,
	path: "/metadata",
})

function Page() {
	return <>Metadata</>
}
