import { Category } from "@/app/lib/definitions";
import Link from 'next/link';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="mb-10 border-b border-zinc-200 pb-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Browse By
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900">
          Categories
        </h3>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: '/',
              query: { categoryId: category.id }
            }}
            className="group relative block overflow-hidden border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-zinc-900"
          >
            {/* Subtle background accent on hover */}
            <div className="absolute inset-0 opacity-0 bg-zinc-50 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Reduced height from h-28 to h-20 for a cleaner fit */}
            <div className="relative z-10 flex flex-col h-20 justify-between">
              {/* Top Row: Decorative Arrow */}
              <div className="flex justify-end items-start">
                <svg
                  className="w-4 h-4 text-zinc-400 transition-all duration-300 transform -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-zinc-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              {/* Bottom Row: Category Name */}
              <h4 className="text-base font-medium tracking-tight text-zinc-700 transition-colors duration-300 group-hover:text-zinc-950">
                {category.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}