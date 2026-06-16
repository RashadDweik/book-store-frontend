"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string;
}

interface FiltersState {
  sort: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  categoryId: string;
  authorId: string;
}

interface FiltersPanelProps {
  categories: Category[];
  authors: Author[];
}

// ─── Sort options ─────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { label: "Relevance", value: "" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Newest First", value: "-created_at" },
  { label: "Oldest First", value: "created_at" },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

function SelectDropdown({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 pr-8 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500 cursor-pointer"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

function PriceRange({
  min,
  max,
  onMinChange,
  onMaxChange,
}: {
  min: string;
  max: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
        Price Range
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
            $
          </span>
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={min}
            onChange={(e) => onMinChange(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg pl-6 pr-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
          />
        </div>
        <span className="text-zinc-400 text-xs shrink-0">to</span>
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
            $
          </span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={max}
            onChange={(e) => onMaxChange(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg pl-6 pr-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
          />
        </div>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-700 dark:text-zinc-200">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-1 ${checked ? "bg-zinc-800 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700"}`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow transition duration-200 ${checked ? "translate-x-4 bg-white dark:bg-zinc-900" : "translate-x-0 bg-white dark:bg-zinc-400"}`}
        />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FiltersPanel({
  categories,
  authors,
}: FiltersPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FiltersState>({
    sort: searchParams.get("sort") ?? "",
    minPrice: searchParams.get("min_price") ?? "",
    maxPrice: searchParams.get("max_price") ?? "",
    inStock: searchParams.get("in_stock") === "true",
    categoryId: searchParams.get("category_id") ?? "",
    authorId: searchParams.get("author_id") ?? "",
  });

  // 1. Sync local state when URL changes
  useEffect(() => {
    setFilters({
      sort: searchParams.get("sort") ?? "",
      minPrice: searchParams.get("min_price") ?? "",
      maxPrice: searchParams.get("max_price") ?? "",
      inStock: searchParams.get("in_stock") === "true",
      categoryId: searchParams.get("category_id") ?? "",
      authorId: searchParams.get("author_id") ?? "",
    });
  }, [searchParams]);

  // 2. Lock body scroll on mobile when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Outside click & Escape handlers
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const applyFilters = useCallback(
    (next: FiltersState) => {
      const params = new URLSearchParams(searchParams.toString());
      const q = params.get("q");
      params.forEach((_, key) => params.delete(key));
      if (q) params.set("q", q);

      if (next.sort) params.set("sort", next.sort);
      if (next.minPrice) params.set("min_price", next.minPrice);
      if (next.maxPrice) params.set("max_price", next.maxPrice);
      if (next.inStock) params.set("in_stock", "true");
      if (next.categoryId) params.set("category_id", next.categoryId);
      if (next.authorId) params.set("author_id", next.authorId);

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams],
  );

function update<K extends keyof FiltersState>(key: K, value: FiltersState[K]) {
  setFilters((prev) => {
    const next = { ...prev, [key]: value };

    // Validation: Ensure minPrice is not greater than maxPrice
    const min = parseFloat(next.minPrice as string);
    const max = parseFloat(next.maxPrice as string);

    if (!isNaN(min) && !isNaN(max) && min > max) {
      // If the user changed min, adjust max to match (or vice-versa)
      return key === "minPrice" 
        ? { ...next, maxPrice: next.minPrice } 
        : { ...next, minPrice: next.maxPrice };
    }

    return next;
  });
}

  function handleApply() {
    applyFilters(filters);
    setOpen(false);
  }

  function handleReset() {
    setOpen(false);
    router.push(pathname); // Clears all params by navigating to base path
  }

  const activeCount = Object.values(filters).filter(
    (v) => v !== "" && v !== false,
  ).length;

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
    flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
    ${
      open || activeCount > 0
        ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
        : "bg-white text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
    }
  `}
      >
        <SlidersHorizontal size={15} />
        <span>Filters</span>
        {activeCount > 0 && (
          <span
            className={`
        inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold
        ${
          open || activeCount > 0
            ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
            : "bg-zinc-800 text-white dark:bg-zinc-700"
        }
      `}
          >
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="z-40 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl fixed bottom-0 left-0 right-0 rounded-b-none sm:absolute sm:bottom-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80 sm:rounded-xl">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-semibold">Filters & Sorting</span>
              <button onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-5 max-h-[70vh] overflow-y-auto sm:max-h-none">
              <SelectDropdown
                label="Sort by"
                value={filters.sort}
                onChange={(v) => update("sort", v)}
                options={SORT_OPTIONS}
              />
              <PriceRange
                min={filters.minPrice}
                max={filters.maxPrice}
                onMinChange={(v) => update("minPrice", v)}
                onMaxChange={(v) => update("maxPrice", v)}
              />
              <Toggle
                label="In stock only"
                checked={filters.inStock}
                onChange={(v) => update("inStock", v)}
              />
              <div className="border-t border-zinc-100 dark:border-zinc-800" />
              <SelectDropdown
                label="Category"
                value={filters.categoryId}
                onChange={(v) => update("categoryId", v)}
                placeholder="All categories"
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
              />
              <SelectDropdown
                label="Author"
                value={filters.authorId}
                onChange={(v) => update("authorId", v)}
                placeholder="All authors"
                options={authors.map((a) => ({ label: a.name, value: a.id }))}
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={handleReset}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium border border-zinc-200"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
