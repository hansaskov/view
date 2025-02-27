import {
	BookMarked,
	BookUser,
	File,
	FileText,
	Film,
	Image,
	KeyRound,
	type LucideIcon,
	Settings,
	Smartphone,
	Tv,
	Users,
} from "lucide-react"

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"

const navMain = [
	{
		title: "Media",
		items: [
			{ title: "Photos", url: "/photos", icon: Image },
			{ title: "Files", url: "/files", icon: File },
			{ title: "Movies", url: "/movies", icon: Film },
			{ title: "Shows", url: "/shows", icon: Tv },
			{ title: "Metadata", url: "/metadata", icon: BookMarked },
		],
	},
	{
		title: "Admin",
		items: [
			{ title: "Users", url: "/users", icon: Users },
			{ title: "API Keys", url: "/api-keys", icon: KeyRound },
			{ title: "Log", url: "/log", icon: FileText },
			{ title: "Settings", url: "/settings", icon: Settings },
		],
	},
] as const

export function NavMain() {
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
