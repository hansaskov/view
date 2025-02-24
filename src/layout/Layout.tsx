import { AppSidebar } from "@/components/app-sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import type { QueryClient } from "@tanstack/react-query"
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const rootRoute = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		)
	},
})

function RootComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbPage>View Dashboard</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div>
					<main>
						<Outlet />
					</main>
					<TanStackRouterDevtools />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
