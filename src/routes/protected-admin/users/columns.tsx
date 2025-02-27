"use client"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import type { Prettify } from "better-auth"
import type { UserWithRole } from "better-auth/plugins"
import { MoreHorizontal, User } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type test = Prettify<UserWithRole>
//^?

export const userColumns: ColumnDef<UserWithRole>[] = [
	{
		accessorKey: "image",
		header: ({ column }) => <></>,
		cell: ({ row }) => {
			const user = row.original
			return (
				<Avatar>
					<AvatarImage
						src={user.image ?? undefined}
						alt={`${user.name || "User"}'s profile picture`}
					/>
					<AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
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
			<DataTableColumnHeader column={column} title="email" />
		),
	},
	{
		accessorKey: "emailVerified",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email Verified" />
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
		cell: ({ row }) => {
			const payment = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
