"use client"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@client/components/ui/sidebar"
import { authClient } from "@client/lib/auth-client"
import { useQueryClient } from "@tanstack/react-query"
import { Link, useParams } from "@tanstack/react-router"
import { ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"
import { CreateOrganizationDialog } from "./create-organization-dialog"
import { LeaveOrganizationDialog } from "./leave-organization-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
export function TeamSwitcher() {
	const { data: organizations } = authClient.useListOrganizations()
	const { data: activeOrganization } = authClient.useActiveOrganization()
	const queryClient = useQueryClient()
	const params = useParams({ strict: false })

	if (!organizations) {
		return
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
										<AvatarImage src={activeOrganization.logo ?? undefined} />
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
							<DropdownMenuItem asChild key={org.name} className="gap-2 p-2">
								{/** This should just navigate to the same page but with different slug. For some reason it does not work */}
								<Link
									preload={false}
									to={params.slug ? "/$slug/sharing" : "/$slug/sharing"}
									params={prev => ({
										...prev,
										slug: org.slug,
									})}
									onClick={async () => {
										await queryClient.invalidateQueries({
											queryKey: ["organization", org.slug],
										})
									}}
								>
									<Avatar className="flex aspect-square size-8 items-center justify-center rounded-lg ">
										<AvatarImage src={org.logo ?? undefined} />
										<AvatarFallback>{org.name.slice(0, 2)}</AvatarFallback>
									</Avatar>
									{org.name}
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<CreateOrganizationDialog />
						{activeOrganization && (
							<LeaveOrganizationDialog
								organizationId={activeOrganization.id}
								organizationName={activeOrganization.name}
							/>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
