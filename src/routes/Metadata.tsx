import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const metadataRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/metadata",
})

function Page() {
	return <>Metadata</>
}
