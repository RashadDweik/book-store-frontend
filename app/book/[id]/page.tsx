import Image from "next/image";
import { getBookDetails } from "@/app/lib/books";
import { BookCard } from "@/app/lib/definitions";
import Link from "next/link";


interface PageProps {
    params: Promise<{ id: string}>
}


export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const book : BookCard = await getBookDetails(id);
  const isAvailable = book.stock > 0;

  return (
    <main className="max-w-5xl mx-auto mt-5 px-4 py-8 md:py-16">
      {/* Back to Catalog Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-8 transition-colors"
      >
        ← Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Book Cover */}
        <div className="relative aspect-3/4 w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <Image
            src={book.cover_url}
            alt={`Cover of ${book.title}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Column: Book Information */}
        <div className="flex flex-col h-full">
          {/* Category Tag */}
          <span className="inline-block self-start px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            {book.category.name}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {book.title}
          </h1>

          {/* Authors List */}
          <p className="text-gray-600 mb-6 text-md">
            By {" "}
            <span className="font-medium text-gray-800">
              {book.authors.map((author) => author.name).join(", ")}
            </span>
          </p>

          <div className="text-2xl font-bold text-gray-900 mb-6">
            {book.price}
          </div>

          {/* Stock Status Badge */}
          <div className="mb-6">
            {isAvailable ? (
              <span className="text-sm font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                In Stock ({book.stock} available)
              </span>
            ) : (
              <span className="text-sm font-medium text-red-700 bg-red-50 px-2.5 py-1 rounded-md">
                Out of Stock
              </span>
            )}
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>

          {/* Metadata Block */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-8 bg-gray-50 p-4 rounded-lg">
            <div>
              <span className="block font-medium text-gray-400 text-xs uppercase tracking-wider">ISBN</span>
              <span className="text-gray-900 font-mono">{book.isbn}</span>
            </div>
            <div>
              <span className="block font-medium text-gray-400 text-xs uppercase tracking-wider">Released</span>
              <span className="text-gray-900">
                {new Date(book.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Call to Action Button */}
          <button
            disabled={!isAvailable}
            className={`w-full md:w-auto mt-auto px-8 py-3.5 rounded-lg font-semibold text-center transition-all ${
              isAvailable
                ? "bg-black text-white hover:bg-gray-800 active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isAvailable ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </main>
  );
}