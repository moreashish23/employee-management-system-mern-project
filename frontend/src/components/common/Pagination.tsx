import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { EmployeeMeta } from "../../types/employee.types";

interface PaginationProps {
  meta: EmployeeMeta;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { page, totalPages, total, limit, hasNextPage, hasPrevPage } = meta;

  if (totalPages <= 1 && total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end   = Math.min(page * limit, total);

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
      <p className="text-sm text-surface-500">
        Showing <span className="font-medium text-surface-700">{start}–{end}</span> of{" "}
        <span className="font-medium text-surface-700">{total}</span> employees
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          className="p-1.5 rounded-lg text-surface-500 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronLeft className="h-5 w-5" />
        </button>

        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-surface-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`
                min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors
                ${p === page
                  ? "bg-primary-600 text-white"
                  : "text-surface-600 hover:bg-surface-100"
                }
              `}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="p-1.5 rounded-lg text-surface-500 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}