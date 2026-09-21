"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { TableSkeleton } from "./loading-state";
import { EmptyState } from "./empty-state";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  searchable = true,
  searchPlaceholder = "Filter records by patient, UHID or complaint...",
  searchFilter,
  pageSize = 8,
  emptyTitle = "No records found",
  emptyDescription = "There are no entries matching the current filter criteria.",
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filtered data
  const filteredData = React.useMemo(() => {
    if (!query.trim() || !searchFilter) return data;
    return data.filter((item) => searchFilter(item, query.toLowerCase()));
  }, [data, query, searchFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Reset page on search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      {searchable && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8.5 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/25 focus-visible:border-teal-700 transition-all shadow-2xs"
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-800 font-semibold tabular-nums">{filteredData.length}</span>{" "}
            records
          </div>
        </div>
      )}

      <div className="rounded-lg border border-slate-200/80 bg-white overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        {isLoading ? (
          <TableSkeleton rows={pageSize} />
        ) : filteredData.length === 0 ? (
          <div className="p-8">
            <EmptyState title={emptyTitle} description={emptyDescription} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/60">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "py-2.5 px-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 select-none",
                        col.className
                      )}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/90">
                {paginatedData.map((item) => (
                  <tr
                    key={keyExtractor(item)}
                    onClick={() => onRowClick?.(item)}
                    className={cn(
                      "transition-colors text-xs text-slate-700",
                      onRowClick ? "cursor-pointer hover:bg-slate-50/70" : "hover:bg-slate-50/30"
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn("py-3 px-4 align-middle", col.className)}
                      >
                        {col.render
                          ? col.render(item)
                          : String((item as Record<string, unknown>)[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination bar */}
        {!isLoading && filteredData.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100/90 bg-slate-50/40 text-xs text-slate-500">
            <div>
              Page <span className="font-semibold text-slate-800">{currentPage}</span> of{" "}
              <span className="font-semibold text-slate-800">{totalPages}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
