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
import { createRoute } from "@tanstack/react-router"
import { columns } from "./columns"
import { payments } from "./data"

export const paymentRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/payment",
})

function Page() {
	const table = createTable({ columns, data: payments })
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
