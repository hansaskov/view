import { DataTable } from "@/components/data-table/data-table"
import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"
import { type Payment, columns } from "./columns"
import { payments } from "./data"

export const paymentRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/payment",
})

function Page() {
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={payments} />
		</div>
	)
}
