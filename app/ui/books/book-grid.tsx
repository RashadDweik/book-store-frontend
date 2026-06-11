// components/BookGrid.tsx (Presentation Component)
import Card from "@/app/ui/books/card";
import { BookCard } from "@/app/lib/definitions";

interface BookGridProps {
  books: BookCard[];
}

export default function BookGrid({ books }: BookGridProps) {
  if (!books || books.length === 0) {
    return (
      <div className="w-full text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          No books available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {books.map((book) => (
        <Card key={book.id} {...book} />
      ))}
    </div>
  );
}