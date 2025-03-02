import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { protectedRoute } from "@/layout/ProtectedRoutes"
import { Link } from "@tanstack/react-router"
import {
	BookMarked,
	File,
	FileText,
	Film,
	Image,
	KeyRound,
	Settings,
	Tv,
	Users,
} from "lucide-react"

export function NavMain() {
	// Move the hook inside the component
	const { user } = protectedRoute.useRouteContext()

	// Define sidebar sections inside the component
	const defaultSidebarSection = {
		title: "Media",
		items: [
			{ title: "Photos", url: "/photos", icon: Image },
			{ title: "Files", url: "/files", icon: File },
			{ title: "Movies", url: "/movies", icon: Film },
			{ title: "Shows", url: "/shows", icon: Tv },
			{ title: "Metadata", url: "/metadata", icon: BookMarked },
		],
	}

	const adminSidebarSection = {
		title: "Admin",
		items: [
			{ title: "Users", url: "/users", icon: Users },
			{ title: "API Keys", url: "/api-keys", icon: KeyRound },
			{ title: "Log", url: "/log", icon: FileText },
			{ title: "Settings", url: "/settings", icon: Settings },
		],
	}

	// Build navigation menu based on user role inside the component
	const navMain = [defaultSidebarSection]
	if (user.role === "admin") {
		navMain.push(adminSidebarSection)
	}

	return (
		<>
			{navMain.map(section => (
				<SidebarGroup key={section.title}>
					<SidebarGroupLabel>{section.title}</SidebarGroupLabel>
					<SidebarMenu>
						{section.items.map(item => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild tooltip={item.title}>
									<Link to={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	)
}
