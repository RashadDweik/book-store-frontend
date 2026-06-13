// server component
import BookGrid from "../ui/books/book-grid";
import SearchBar from "../ui/search";
import { fetchBooks } from "../lib/books/books";

type SearchParams = Promise<{
  q?: string;
  categoryId?: string;
  authorId?: string;
}>;

export default async function Page(props: { searchParams?: SearchParams }) {
  const params = await props.searchParams;
  const filters = { ...params };
  const books = await fetchBooks(filters);

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      {/* Unified page structural wrapper padding layout */}
      <div className="max-w-6xl mx-auto py-12 sm:py-16">
        
        {/* Core Search Controller */}
        <SearchBar />
        
        {/* Dynamic Display Grid */}
        <div className="px-4 mt-8">
          <BookGrid books={books} />
        </div>
        
      </div>
    </main>
  );
}