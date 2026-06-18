"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalCount: number;
  limit: number;
}

export default function Pagination({ totalCount, limit }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Math.floor(Number(searchParams.get("offset") || 0) / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    const offset = (Number(pageNumber) - 1) * limit;
    params.set("offset", offset.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => replace(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => replace(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}