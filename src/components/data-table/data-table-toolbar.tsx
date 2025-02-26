import type { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	accessorKey: string
}

export function DataTableToolbar<TData>({
	table,
	accessorKey,
}: DataTableToolbarProps<TData>) {
	const placeholder = `Filter ${accessorKey}s`

	return (
		<div className="flex items-center py-4">
			<Input
				placeholder={placeholder}
				value={(table.getColumn(accessorKey)?.getFilterValue() as string) ?? ""}
				onChange={event =>
					table.getColumn(accessorKey)?.setFilterValue(event.target.value)
				}
				className="max-w-sm"
			/>
			<DataTableViewOptions table={table} />
		</div>
	)
}
