import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../layout/Layout"

export const homepageRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/",
})

function Page() {
	return (
		<>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<h1 className="text-2xl font-bold">Welcome to View</h1>
				<p>Your all-in-one media management solution.</p>
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
						Photos
					</div>
					<div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
						Files
					</div>
					<div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
						Movies & Shows
					</div>
				</div>
			</div>
		</>
	)
}
