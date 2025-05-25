import type { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	accessorKey?: string
}

const pluralize = (word: string) => (word.endsWith("s") ? word : `${word}s`)

export function DataTableToolbar<TData>({
	table,
	accessorKey,
}: DataTableToolbarProps<TData>) {
	return (
		<div className="flex items-center pb-4">
			{accessorKey && (
				<Input
					placeholder={`Filter ${pluralize(accessorKey)}`}
					value={
						(table.getColumn(accessorKey)?.getFilterValue() as string) ?? ""
					}
					onChange={event =>
						table.getColumn(accessorKey)?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			)}

			<DataTableViewOptions table={table} />
		</div>
	)
}
