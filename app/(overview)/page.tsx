// server component
import BookGrid from "../ui/books/book-grid";
import SearchBar from "../ui/search";
import FiltersPanel from "../ui/books/filters-panel";
import { fetchBooks } from "../lib/books/books";
import { fetchCategories } from "../lib/categories/categories";
import { fetchAuthors } from "../lib/authors/authors";

type SearchParams = Promise<{
  q?: string;
  category_id?: string;
  author_id?: string;
  sort?: string;
  min_price?: string;
  max_price?: string;
  in_stock?: string;
}>;

export default async function Page(props: { searchParams?: SearchParams }) {
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
        <div className="px-4 mt-8">
          <BookGrid books={books} />
        </div>

      </div>
    </main>
  );
}
