import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { createTable } from "@/components/data-table/table"
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
		<div className="container mx-auto py-10">
			<DataTable table={table} toolbar={toolbar} />
		</div>
	)
}
