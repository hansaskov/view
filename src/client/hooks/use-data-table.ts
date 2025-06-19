import {
	type ColumnDef,
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table"
import { useState } from "react"

interface UseDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	initialState?: {
		sorting?: SortingState
		columnFilters?: ColumnFiltersState
		columnVisibility?: VisibilityState
		pagination?: PaginationState
	}
}

export function useDataTable<TData, TValue>({
	columns,
	data,
	initialState = {},
}: UseDataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>(
		initialState.sorting || []
	)
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
		initialState.columnFilters || []
	)
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		initialState.columnVisibility || {}
	)
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
		...initialState.pagination,
	})

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			pagination,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})

	return table
}
