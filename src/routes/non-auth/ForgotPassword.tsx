import { nonAuthRoute } from "@/layout/NonAuthLayout"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../../layout/RootLayout"

export const forgotPasswordRoute = createRoute({
	getParentRoute: () => nonAuthRoute,
	component: Page,
	path: "/forgot-password",
})

function Page() {
	return <>Whoops, looks like you've forgotten your password</>
}
