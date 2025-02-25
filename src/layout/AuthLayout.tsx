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
import { authClient } from "@/lib/auth-client"
import { Outlet, createRoute, redirect } from "@tanstack/react-router"
import { toast } from "sonner"
import { rootRoute } from "./RootLayout"

export const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "auth-layout",
	component: Layout,
	beforeLoad: async ({ location }) => {
		const { data: session } = await authClient.getSession()

		if (!session) {
			toast.error("Invalid session. Redirecting to /login")
			throw redirect({
				to: "/login",
				search: location.href,
			})
		}
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
