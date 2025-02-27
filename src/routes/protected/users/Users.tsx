import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { createTable } from "@/components/data-table/table"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { protectedRoute } from "@/layout/ProtectedRoutes"
import { authClient } from "@/lib/auth-client"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createRoute } from "@tanstack/react-router"
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
	getParentRoute: () => protectedRoute,
	component: Page,
	loader: ({ context }) => context.queryClient.ensureQueryData(qOptions),
	path: "/users",
})

function Page() {
	const {
		data: { data },
	} = useSuspenseQuery(qOptions)

	const table = createTable({ columns: userColumns, data: data?.users ?? [] })
	const toolbar = <DataTableToolbar table={table} accessorKey={"email"} />

	return (
		<div className=" px-10 py-6">
			<Card>
				<CardHeader>
					<CardTitle>Payments</CardTitle>
					<CardDescription>Manage your payment transactions</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable table={table} toolbar={toolbar} />
				</CardContent>
			</Card>
		</div>
	)
}
