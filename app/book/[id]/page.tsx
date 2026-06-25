import Image from "next/image";
import { getBookDetails } from "@/app/lib/books/books";
import { BookCard, WishlistResponse } from "@/app/lib/definitions";
import WishlistButton from "@/app/ui/wishlist/wishlist-button";
import CartButton from "@/app/ui/cart/cart-button";
import { fetchWishlist } from "@/app/lib/wishlists/actions";
import Link from "next/link";
import { getSession } from "@/app/lib/auth/session";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BookDetailsPage({ params }: PageProps) {
  const session = await getSession();

  const { id } = await params;

  const book: BookCard = await getBookDetails(id);
  const wishlist : WishlistResponse = await fetchWishlist();
  const isInWishlist = wishlist.items.some((item) => item.book.id === book.id);
  const bookItem = wishlist.items.find((item) => item.book.id === book.id);
  const isAvailable = book.stock > 0;

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
        
        {/* Back to Catalog Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors"
        >
          ← Back to Catalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Book Cover */}
          <div className="relative aspect-3/4 w-full max-w-md mx-auto bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
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
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 border border-zinc-200 px-2 py-0.5 dark:border-zinc-800">
                {book.category.name}
              </span>
            </div>

            {/* Title & Author */}
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">
              {book.title}
            </h1>

            <p className="text-xs font-mono text-zinc-400 mb-6">
              By <span className="text-zinc-600 dark:text-zinc-300">{book.authors.map((author) => author.name).join(", ")}</span>
            </p>

            {/* Price Tag */}
            <div className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              {book.price}
            </div>

            {/* Stock Status Block */}
            <div className="mb-6">
              {isAvailable ? (
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 px-2 py-1 border border-emerald-200/50 dark:border-emerald-800/30">
                  In Stock // {book.stock} Available
                </span>
              ) : (
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-500 bg-red-50/50 dark:bg-red-950/20 px-2 py-1 border border-red-200/50 dark:border-red-800/30">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description Section */}
            <div className="border-t border-b border-zinc-200 py-6 mb-6 dark:border-zinc-800">
              <h2 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Description
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-8 border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-0.5">ISBN</span>
                <span className="text-zinc-900 font-mono dark:text-zinc-100">{book.isbn}</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-0.5">Released</span>
                <span className="text-zinc-900 dark:text-zinc-100">
                  {new Date(book.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

          
            {/* Action Buttons */}

            {/* Cart Button */}
            <CartButton bookId={book.id} isAvailable={isAvailable} isAuthenticated={session.isAuthenticated} stock={book.stock} />

            {/* Wishlist Button */}
            <WishlistButton bookId={book.id} itemId={bookItem?.id} initialStatus={isInWishlist} isAuthenticated={session.isAuthenticated} />
          </div>
        </div>
      </div>
    </main>
  );
}