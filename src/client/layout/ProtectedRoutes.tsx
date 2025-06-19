import { AppSidebar } from "@client/components/app-sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@client/components/ui/breadcrumb"
import { Separator } from "@client/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@client/components/ui/sidebar"
import { authClient } from "@client/lib/auth-client"
import { queryOptions } from "@tanstack/react-query"
import { createRoute, Outlet, redirect } from "@tanstack/react-router"
import { rootRoute } from "./RootRoutes"

const qOptions = queryOptions({
	queryKey: ["sessions"],
	queryFn: () => authClient.getSession(),
	staleTime: 10 * 1000, // 10 seconds
	retryDelay: 1 * 1000, // 1 second
	retry: 1,
})

export const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "protected-route",
	component: Layout,
	beforeLoad: async ({ location, context: { queryClient } }) => {
		const { data: session } = await queryClient.fetchQuery(qOptions)

		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirectURL: location.href },
			})
		}

		return session
	},
})

function Layout() {
	return (
		<>
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
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
