"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    // Maintain page queries if they exist, but update search terms
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-6">
      {/* Structural Minimalist Label */}
      <label 
        htmlFor="catalog-search" 
        className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
      >
        Search Catalog
      </label>
      
      {/* Input Field Container */}
      <div className="relative flex items-center w-full">
        <input
          id="catalog-search"
          type="text"
          defaultValue={searchParams.get("q")?.toString()}
          placeholder="Search by title, author, or keyword..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border border-zinc-200 bg-white pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 outline-none transition-colors duration-200 focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-50"
        />
        
        {/* Sleek inline search vector icon */}
        <div className="absolute left-3.5 pointer-events-none flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-zinc-400 dark:text-zinc-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z" />
          </svg>
        </div>
      </div>
    </div>
  );
}