import { DataTableColumnHeader } from "@client/components/data-table/data-table-column-header"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@client/components/ui/avatar"
import { Badge } from "@client/components/ui/badge"
import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type Member = {
	id: string
	organizationId: string
	createdAt: Date
	role: "admin" | "member" | "owner"
	teamId?: string
	userId: string
	user: {
		email: string
		name: string
		image?: string
	}
}

export const userColumns: ColumnDef<Member>[] = [
	{
		accessorKey: "user.image",
		header: () => <></>,
		cell: ({ row }) => {
			const { user } = row.original
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
		accessorKey: "user.name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
	},
	{
		accessorKey: "user.email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => {
			const member = row.original

			if (member.role === "owner")
				return <Badge variant={"secondary"}>Owner</Badge>
			if (member.role === "admin") return <Badge>Admin</Badge>

			return <Badge variant={"default"}>{member.role}</Badge>
		},
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
]
