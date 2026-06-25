// server component
import BookGrid from "@/app/ui/books/book-grid";
import SearchBar from "@/app/ui/search";
import FiltersPanel from "@/app/ui/books/filters-panel";
import { fetchBooks } from "@/app/lib/books/books";
import { fetchCategories } from "@/app/lib/categories/actions";
import { fetchAuthors } from "@/app/lib/authors/actions";
import { FetchBooksFilters } from "@/app/lib/definitions";
import Pagination from "@/app/ui/books/pagination";

const LIMIT = 20;

export default async function Page(props: { searchParams?: FetchBooksFilters }) {
  
  const params = await props.searchParams;
  const filters = { ...params };

  // Parallel-fetch books, categories, and authors
  const [books, categories, authors] = await Promise.all([
    fetchBooks(filters),
    fetchCategories(),
    fetchAuthors(),
  ]);

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      <div className="max-w-6xl mx-auto py-12 sm:py-16">

        {/* Search + Filters row */}
        <div className="px-4 flex items-center gap-3">
          <div className="flex-1">
            <SearchBar />
          </div>
          <FiltersPanel categories={categories} authors={authors} />
        </div>

        {/* Dynamic Display Grid */}
        <div className="px-4 mt-8 flex flex-col">
          <BookGrid books={books.books} />
          <Pagination totalCount={books.totalCount} limit={LIMIT} />
        </div>

      </div>
    </main>
  );
}
