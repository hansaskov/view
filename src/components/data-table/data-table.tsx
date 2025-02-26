"use client"

import { type Table, flexRender } from "@tanstack/react-table"

import {
	Table as RootTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData> {
	table: Table<TData>
	toolbar?: React.ReactNode
}

export function DataTable<TData>({ table, toolbar }: DataTableProps<TData>) {
	const size = table.getTotalSize()

	return (
		<div>
			{toolbar}
			<div className="rounded-md border">
				<RootTable>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={size} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</RootTable>
			</div>
			<DataTablePagination table={table} />
		</div>
	)
}
