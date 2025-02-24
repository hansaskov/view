"use client"

import {
	BookMarked,
	BookUser,
	Database,
	File,
	FileText,
	Film,
	GalleryVerticalEnd,
	Image,
	Key,
	KeyRound,
	Settings,
	Smartphone,
	Tv,
	Users,
} from "lucide-react"
import type * as React from "react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

// Update the data object to include the new sections
const data = {
	user: {
		name: "John Doe",
		email: "john@example.com",
		avatar: "/avatars/john-doe.jpg",
	},
	teams: [
		{
			name: "View",
			logo: GalleryVerticalEnd,
			plan: "Pro",
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
