"use client"

import { auth } from "@/auth/better-auth"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import type { ColumnDef } from "@tanstack/react-table"
import type { Prettify } from "better-auth"
import type { UserWithRole } from "better-auth/plugins"
import {
	CheckCircle,
	MoreHorizontal,
	Router,
	User,
	XCircle,
} from "lucide-react"
import { toast } from "sonner"
import { usersRoute } from "./Users"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type UserWithRole1 = Prettify<UserWithRole>
//^?

export const userColumns: ColumnDef<UserWithRole>[] = [
	{
		accessorKey: "image",
		header: () => <></>,
		cell: ({ row }) => {
			const user = row.original
			return (
				<Avatar>
					<AvatarImage
						src={user.image ?? undefined}
						alt={`${user.name || "User"}'s profile picture`}
					/>
					<AvatarFallback className="font-semibold uppercase">
						{user.name.slice(0, 2)}
					</AvatarFallback>
				</Avatar>
			)
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => {
			const { email, emailVerified } = row.original

			return (
				<div className="flex items-center gap-2">
					<span>{email}</span>
					{emailVerified ? (
						<CheckCircle
							className="h-4 w-4 text-green-500"
							aria-label="Verified"
						/>
					) : (
						<XCircle
							className="h-4 w-4 text-red-500"
							aria-label="Not verified"
						/>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created At" />
		),
		cell: ({ row }) => {
			return row.original.createdAt.toDateString()
		},
	},

	{
		id: "actions",
		cell: function ActionCell({ row }) {
			const user = row.original
			const router = useRouter()
			const queryClient = useQueryClient()

			const removeUserMutation = useMutation({
				mutationKey: ["removeUser", user.id],
				mutationFn: () => authClient.admin.removeUser({ userId: user.id }),
				onSuccess: async () => {
					await queryClient.invalidateQueries({ queryKey: ["users"] })
				},
			})

			const setRoleMutation = useMutation({
				mutationKey: ["setRole", user.id],
				mutationFn: (role: string) =>
					authClient.admin.setRole({ userId: user.id, role }),
				onSuccess: async ({ data }) => {
					await queryClient.invalidateQueries({ queryKey: ["users"] })
				},
			})

			const banUserMutation = useMutation({
				mutationKey: ["banUser", user.id],
				mutationFn: () => authClient.admin.banUser({ userId: user.id }),
				onSuccess: async () => {
					await queryClient.invalidateQueries({ queryKey: ["users"] })
				},
			})

			const unbanUserMutation = useMutation({
				mutationKey: ["unbanUser", user.id],
				mutationFn: () => authClient.admin.unbanUser({ userId: user.id }),
				onSuccess: async () => {
					await queryClient.invalidateQueries({ queryKey: ["users"] })
				},
			})

			const revokeSessionsMutation = useMutation({
				mutationKey: ["revokeSessions", user.id],
				mutationFn: () =>
					authClient.admin.revokeUserSessions({ userId: user.id }),
			})

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel className="font-semibold">
							User Actions
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									onSelect={() => setRoleMutation.mutate("admin")}
								>
									Set as Admin
								</DropdownMenuItem>
								<DropdownMenuItem
									onSelect={() => setRoleMutation.mutate("user")}
								>
									Set as User
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						{user.banned ? (
							<DropdownMenuItem onSelect={() => unbanUserMutation.mutate()}>
								Unban User
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem onSelect={() => banUserMutation.mutate()}>
								Ban User
							</DropdownMenuItem>
						)}
						<DropdownMenuItem onSelect={() => revokeSessionsMutation.mutate()}>
							Revoke All Sessions
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={() => removeUserMutation.mutate()}
							className="text-red-600 focus:text-red-50 focus:bg-red-600"
						>
							Delete User
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
