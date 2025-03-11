import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useDataTable } from "@/hooks/use-data-table"
import { protectedOrganizationAdminRoute } from "@/layout/ProtectedOrganizationAdminRoutes"
import { createRoute } from "@tanstack/react-router"
import { userColumns } from "./columns"
import { useMemo } from "react"

export const orgUsersRoute = createRoute({
	getParentRoute: () => protectedOrganizationAdminRoute,
	component: Page,
	path: "/users",
})

function Page() {
	const { activeOrganization } =
		protectedOrganizationAdminRoute.useRouteContext()

	const members = useMemo(
		() => activeOrganization.members ?? [],
		[activeOrganization.members]
	)

	// Use our custom hook instead of the inline table creation
	const table = useDataTable({
		columns: userColumns,
		data: members,
		initialState: {
			pagination: {
				pageSize: 10,
				pageIndex: 0,
			},
		},
	})

	const toolbar = <DataTableToolbar table={table} accessorKey="user.email" />

	return (
		<div className="px-10 py-6">
			<Card>
				<CardHeader>
					<CardTitle>User Management</CardTitle>
					<CardDescription>
						View, modify permissions, restrict access, or remove accounts from
						the platform
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable table={table} toolbar={toolbar} />
				</CardContent>
			</Card>
		</div>
	)
}
