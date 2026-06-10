// components/BookGrid.tsx (Presentation Component)
import Card from "@/app/ui/books/card";
import { BookCard } from "@/app/lib/definitions";

interface BookGridProps {
  books: BookCard[];
}

export default function BookGrid({ books }: BookGridProps) {
   if (!books || books.length == 0){
     return <div className=" mt-10 text-center text-neutral-500">No books available.</div>
   }
   return (
    <div className="grid w-full p-2 my-2 mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <Card key={book.id} {...book} />
      ))}
    </div>
   )
}