import Link from "next/link";
import { fetchWishlist } from "@/app/lib/wishlists/actions";
import { WishlistResponse } from "@/app/lib/definitions";
import { WishlistItemRow } from "@/app/ui/wishlist/wishlist-item";

export default async function WishlistPage() {
  const wishlist: WishlistResponse = await fetchWishlist();
  const wishlistItems = wishlist.items || [];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

      {/* Section header — matches AuthorGrid / OrdersPage */}
      <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Your
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          Wishlist
        </h3>
        {wishlistItems.length > 0 && (
          <p className="text-xs font-mono text-zinc-400 mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? "book" : "books"}
          </p>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-14 flex flex-col items-center gap-5 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Your wishlist is empty
          </p>
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider border border-zinc-200 dark:border-zinc-700 px-5 py-2.5 text-zinc-600 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col">
          {wishlistItems.map((item) => (
            <WishlistItemRow key={item.id} item={item} />
          ))}
        </ul>
      )}

    </main>
  );
}