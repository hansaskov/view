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
import { protectedAdminRoute } from "@/layout/ProtectedAdminRoutes"
import { authClient } from "@/lib/auth-client"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"
import { useMemo } from "react"
import { userColumns } from "./columns"

const qOptions = queryOptions({
	queryKey: ["users"],
	queryFn: () =>
		authClient.admin.listUsers({
			query: {
				limit: 100,
			},
		}),
})

export const usersRoute = createRoute({
	getParentRoute: () => protectedAdminRoute,
	component: Page,
	loader: ({ context }) => context.queryClient.ensureQueryData(qOptions),
	path: "/users",
})

function Page() {
	const {
		data: { data },
	} = useSuspenseQuery(qOptions)

	// Memoize the data to prevent unnecessary re-renders
	const users = useMemo(() => data?.users ?? [], [data?.users])

	// Use our custom hook instead of the inline table creation
	const table = useDataTable({
		columns: userColumns,
		data: users,
		initialState: {
			pagination: {
				pageSize: 10,
				pageIndex: 0,
			},
		},
	})

	const toolbar = <DataTableToolbar table={table} accessorKey="email" />

	return (
		<div className="px-10 py-6">
			<Card>
				<CardHeader>
					<CardTitle>User Management</CardTitle>
					<CardDescription>
						View, modify permissions, restrict access, or remove accounts from
						the platform.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable table={table} toolbar={toolbar} />
				</CardContent>
			</Card>
		</div>
	)
}
