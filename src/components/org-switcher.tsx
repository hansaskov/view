"use client"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"
import { CreateOrganizationDialog } from "./create-organization-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
export function TeamSwitcher() {
	const { data: organizations } = authClient.useListOrganizations()
	const { data: activeOrganization } = authClient.useActiveOrganization()
	if (!organizations) {
		return <></>
	}
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							{activeOrganization ? (
								<>
									<Avatar className="flex aspect-square size-8 items-center justify-center rounded-lg ">
										<AvatarImage src={activeOrganization.logo} />
										<AvatarFallback>
											{activeOrganization.name.slice(0, 2)}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{activeOrganization.name}
										</span>
										<span className="truncate text-xs">
											{activeOrganization.slug}
										</span>
									</div>
								</>
							) : (
								<>
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<GalleryVerticalEnd className="size-4" />
									</div>

									<div className="flex-1 text-left">
										<p className="font-semibold truncate">
											Select your organization
										</p>
									</div>
								</>
							)}
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side="bottom"
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Organizations
						</DropdownMenuLabel>
						{organizations.map((org, index) => (
							<DropdownMenuItem
								key={org.name}
								onClick={() => {
									authClient.organization.setActive({
										organizationSlug: org.slug,
									})
								}}
								className="gap-2 p-2"
							>
								<Avatar className="flex aspect-square size-8 items-center justify-center rounded-lg ">
									<AvatarImage src={org.logo ?? undefined} />
									<AvatarFallback>{org.name.slice(0, 2)}</AvatarFallback>
								</Avatar>
								{org.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<CreateOrganizationDialog />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
